export default function NumberColor({value , version}){

    const getText = (value)=>{
        if(value < 0){
            return `below IMDb's rating`
        }
        else if(value > 0){
            return `above IMDb's rating`
        }
    }
    const getColor = (value) => {
            console.log(version)
        if(version!==3){
            let clampedValue = value;
            if(version==4){
                if(value < 0){
                    return `rgb(255, 0, 0)`;
                }
                else if(value > 0){
                    return `rgb(0, 255, 0)`;
                }
            }
            else{
                clampedValue = Math.min(10, Math.max(0, value));

            }
            
        if (clampedValue <= 3) {
          // Red zone (0-3)
          return `rgb(255, ${Math.round(150 * (clampedValue / 3))}, 0)`;
        } else if (clampedValue <= 6) {
          // Yellow zone (4-6)
          return `rgb(${Math.round(255 - (clampedValue - 3) * (255 / 3))}, 255, 0)`;
        } else {
          // Green zone (7-10)
          return `rgb(${Math.round((10 - clampedValue) * (255 / 3))}, 255, 0)`;
        }}
        else if(version===3){
            if(value < 0){
                return `rgb(255, 0, 0)`
            }
            else if(value > 0){
                return `rgb(0,255, 0)`

            }
            else{
                return `#FEBE10`
            }
        }
        else{

        }
      };

    return(
        <div className="flex items-center gap-x-1 justify-center">
            {version!==4&&
            <p
            style={{ 
                color: getColor(value), 
            }}
            className="font-semibold"
            >
                {Math.abs(value)}
        </p>    }
            
        {version===4&&
        <>
        <p
        style={{ 
            color: getColor(value), 
        }}
        className="font-semibold"
        >
            {Math.abs(value)}
    </p>
        <p className="text-[#393f4d]">
        {getText(value)}
        </p></>}
        </div>
    )}