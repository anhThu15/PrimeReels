
export default function RatingStars(props){

    const fullStars = Math.floor(props.rating);
    const emptyStars = 5 - fullStars;  

    // console.log(fullStars, emptyStars);
    
    return (
        <>
        <div className="col-2 mt-2">

            {Array(fullStars).fill().map((s, i) => (
                <i key={i} className="fa-solid fa-star text-warning"></i>
            ))}
            {Array(emptyStars).fill().map((s, i) => (
                <i key={i} className="fa-solid fa-star text-secondary"></i>
            ))}

        </div>
        </>
    )
}