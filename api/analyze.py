import pandas as pd
import numpy as np
import operator

def analyze(filename):
    try:
        df = pd.read_csv(filename)

        # Genres
        genre_counts = df.groupby('Genres').size().reset_index(name='Count')
        individual_genres = {}
        for genres in genre_counts['Genres']:
            for genre in genres.split(','):
                genre = genre.strip()
                individual_genres[genre] = individual_genres.get(genre, 0) + 1

        # Your ratings
        your_ratings = df.groupby('Your Rating').size().reset_index(name='Count')
        your_ratings = your_ratings.sort_values(by='Count', ascending=False)

        # IMDb ratings
        df_clone = df.copy()
        df_clone["IMDb Rating"] = np.floor(df_clone['IMDb Rating'])
        imdb_ratings = df_clone.groupby('IMDb Rating').size().reset_index(name='Count')
        imdb_ratings = imdb_ratings.sort_values(by='Count', ascending=False)

        # Director Stats
        director_counts = df.groupby('Directors').size().reset_index(name='Count')
        individual_directors = {}
        for directors in director_counts['Directors']:
            for director in directors.split(','):
                director = director.strip()
                if director in individual_directors:
                    individual_directors[director] += 1
                else:
                    count_value = director_counts.loc[director_counts['Directors'] == director, 'Count']
                    individual_directors[director] = count_value.iloc[0] if not count_value.empty else 1
        sorted_directors = sorted(individual_directors.items(), key=operator.itemgetter(1), reverse=True)

        top_5_directors = sorted_directors[:5]

        avg_rating = df['Your Rating'].mean()
        avg_IMDB_rating = df['IMDb Rating'].mean()
        total_watch_time = df['Runtime (mins)'].sum()
        avg_difference = (df['Your Rating'].sum() - df['IMDb Rating'].sum()) / len(df)

        last_movie_rated = { df['Title'].iloc[0]: df['Date Rated'].iloc[0] }
        first_movie_rated = { df['Title'].iloc[-1]: df['Date Rated'].iloc[-1] }

        # Runtime Stats
        movies_df = df[df["Title Type"] == "Movie"]
        movie_length_stats = {
            "Shortest Movie": movies_df.loc[movies_df["Runtime (mins)"].idxmin(), ["Title", "Runtime (mins)"]].to_dict(),
            "Longest Movie": movies_df.loc[movies_df["Runtime (mins)"].idxmax(), ["Title", "Runtime (mins)"]].to_dict(),
            "Average Length": movies_df["Runtime (mins)"].mean()
        }


        df['rating_diff'] = df['Your Rating'] - df['IMDb Rating']

     
        underrated = df[df['rating_diff'] > 0].sort_values('rating_diff', ascending=False).head(5)
        underrated_list = list(zip(underrated['Title'], underrated['rating_diff']))

        overrated = df[df['rating_diff'] < 0].sort_values('rating_diff', ascending=True).head(5)
        overrated_list = list(zip(overrated['Title'], overrated['rating_diff'] * -1))

        result = {
            "individual_genres": individual_genres,
            "your_ratings": your_ratings.to_dict(orient="records"),
            "imdb_ratings": imdb_ratings.to_dict(orient="records"),
            "top_directors": top_5_directors,
            "average_ratings": {
                "your_rating": avg_rating,
                "imdb_rating": avg_IMDB_rating
            },
            "differing_opinions":{
                "underrated": underrated_list,
                "overrated": overrated_list,
            },
            "total_watch_time": total_watch_time,
            "last_movie_rated": last_movie_rated,
            "first_movie_rated": first_movie_rated,
            "average_difference": avg_difference,
            "movie_length_stats": movie_length_stats
        }
        
        return result
    
    except Exception as e:
        print(f"Error in analyze: {str(e)}")
        import traceback
        traceback.print_exc()
        raise Exception(f"Analysis failed: {str(e)}")