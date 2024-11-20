
export default function RatingStars(props){

    const fullStars = Math.floor(props.rating);
    const emptyStars = 5 - fullStars;  

    // console.log(fullStars, emptyStars);
    
    return (
        <>
        <div className="col-2 mt-2">

            {Array(fullStars).fill().map((s, i) => (
                <div key={i} className="saoCMT bg-warning" style={{width:"30px", height:"30px"}}></div>
            ))}
            {Array(emptyStars).fill().map((s, i) => (
                <div key={i} className="saoCMT bg-secondary" style={{width:"30px", height:"30px"}}></div>
            ))}

        </div>
        </>
    )
}