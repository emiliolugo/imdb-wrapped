import NumberColor from "./NumberColor";
import { motion } from "motion/react";

export default function DifferingOpinionsPage({differingOpinions}){
    const overrated =differingOpinions.overrated
    const underrated =differingOpinions.underrated

    return(
        <div className="text-[#d4d4dc] h-auto md:h-screen flex flex-col justify-center">
        
            <div>
                <div className="text-center mb-20">
                <h2 className="text-center md:text-5xl text-3xl font-black mb-2 md:mb-10">
                Your
                <span className='text-[#FF0000] font-bold'> Overrated </span>
                Movies
                
            </h2>
            <div className="flex flex-wrap justify-center gap-10">
            {overrated.map((item) => (
                <motion.div 
                key={item[0]} 
                className="
                flex flex-col
                  bg-white 
                  border-t-4
                  border-t-red-500 
                  h-56
                  w-56
                  drop-shadow-md
                  rounded-lg
                  p-5
                "
                whileHover={{ 
                  y: -5,
                  scale: 1.03,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                transition={{ 
                  duration: 0.3 
                }}
              >
                <h4 className="text-[#02013A] font-semibold text-xl mb-auto">{item[0]}</h4>

                <p className="mt-auto"><NumberColor value={Math.round(item[1]*10)/-10} version={4} /></p>
                
              </motion.div>
            ))}
            </div>
            
        </div>
        <div className="text-center my-auto">
        <h2 className="text-center md:text-5xl text-3xl font-black mb-2 md:mb-10">
                Your
                <span className='text-[#00FF00] font-bold'> Underrated </span>
                Movies
                
            </h2>
            <div className="flex flex-wrap justify-center gap-10">
            {underrated.map((item) => (
                <motion.div 
                key={item[0]} 
                className="
                flex flex-col
                  bg-white 
                  border-t-4
                  border-t-[#00FF00]
                  h-56
                  w-56
                  drop-shadow-md
                  rounded-lg
                  p-5
                "
                whileHover={{ 
                  y: -5,
                  scale: 1.03,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                transition={{ 
                  duration: 0.3 
                }}
              >
                <h4 className="text-[#02013A] font-semibold text-xl mb-auto">{item[0]}</h4>

                <p className="mt-auto"><NumberColor value={Math.round(item[1]*10)/10} version={4} /></p>
                
              </motion.div>
            ))}
            </div>
            
        </div>
        
                </div>
        </div>
    )
}