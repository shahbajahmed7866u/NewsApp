import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl?imageUrl:"https://www.hindustantimes.com/ht-img/img/2023/05/28/1600x900/Prime-Minister-Narendra-Modi--File-Photo-_1685100967303_1685232074082.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem