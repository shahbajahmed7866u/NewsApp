import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props
    return (
      <div className='m-4 my-3 d-flex'>
        <div className="card">
          <img src={imageUrl?imageUrl:"https://www.hindustantimes.com/ht-img/img/2023/05/28/1600x900/Prime-Minister-Narendra-Modi--File-Photo-_1685100967303_1685232074082.jpg"} className="card-img-top" alt="..." />
          <div className="card-body d-flex flex-column justify-content-between align-items-center p-3">
            <div>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            </div>
            <div>
            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem