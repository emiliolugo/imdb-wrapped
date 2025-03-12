import NumberColor from "./NumberColor";

export default function DifferingOpinionsPage({differingOpinions}){
    const overrated =differingOpinions.overrated
    const underrated =differingOpinions.underrated

    return(
        <div className="text-[#d4d4dc] bg-[#393f4d] h-auto md:h-screen flex flex-col justify-center">
            <h1 className="text-center text-7xl font-black mb-10">
                Differing Opinions
            </h1>
            <div className="flex lg:flex-row flex-col items-center justify-center gap-x-5">
                <div className="text-center">
                <h2 className="text-center text-2xl md:text-3xl font-black mb-2 md:mb-10">
                Movies You think are Overrated
                
            </h2>
            {overrated.map((item) => {
                return (
                    <div key={item[0]}>
                    <h4 className="font-semibold text-xl">{item[0]}</h4>
                    <NumberColor value={Math.round(item[1]*10)/-10} version={4} />
                    </div>
                );
                })}
        </div>
        <div className="text-center">
        <h2 className="text-center text-2xl md:text-3xl font-black my-2 md:mb-10">
                Movies You think are Underrated
                
            </h2>
            {underrated.map((item) => {
                return (
                    <div key={item[0]}>
                    <h4 className="font-semibold text-xl">{item[0]}</h4>
                    <NumberColor value={Math.round(item[1]*10)/10} version={4} />
                    </div>
                );
                })}
        </div>
        
                </div>
        </div>
    )
}