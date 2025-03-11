export default function DifferingOpinionsPage({differingOpinions}){
    const overrated =differingOpinions.overrated
    const underrated =differingOpinions.underrated

    return(
        <div>
            <h2>
                Movies You think are Overrated
                
            </h2>
            {overrated.map((item) => {
                return (
                    <div key={item[0]}>
                    <h4>{item[0]}</h4>
                    <h4>{Math.round(item[1]*10)/10}</h4>
                    </div>
                );
                })}
        
        <h2>
                Movies You think are Underrated
                
            </h2>
            {underrated.map((item) => {
                return (
                    <div key={item[0]}>
                    <h4>{item[0]}</h4>
                    <h4>{Math.round(item[1]*10)/10}</h4>
                    </div>
                );
                })}
        </div>
    )
}