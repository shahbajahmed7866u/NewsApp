import React from 'react'

const Newsitem =(props)=> {

    let { title, description, imageUrl, newsUrl, author, date } = props
    return (
      <div className='m-4 my-3 d-flex'>
        <div className="card">
          <img src={imageUrl ? imageUrl : "https://www.feednavigator.com/var/wrbm_gb_food_pharma/storage/images/9/2/8/5/235829-6-eng-GB/Feed-Test-SIC-Feed-20142.jpg"} className="card-img-top" alt="..." />
          <div className="card-body d-flex flex-column justify-content-between align-items-center p-3">
            <div>
              <h5 className="card-title">{title ? title : 'No Title'}</h5>
              <p className="card-text">{description ? description : "No Description Available"}</p>
              <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unkown"} On {date ? new Date(date).toGMTString() : "Unknown Date"}</small></p>
            </div>
            <div>
              <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
            </div>
          </div>
        </div>
      </div>
    )
  
}

export default Newsitem