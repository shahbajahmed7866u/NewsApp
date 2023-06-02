import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
export class News extends Component {
  articles = []
  constructor() {
    super();
    console.log("Hello")
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1
    }
  }

  async UpdateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9db77eef4174b9b8af7ca428ca9c97f&pageSize=${this.props.pageSize}&page=${this.state.page}`
    this.setState({ loading: true })
    let data = await fetch(url);
    let paredData = await data.json()
    console.log(paredData)
    this.setState({
      articles: paredData.articles,
      totalResults: paredData.totalResults,
      loading: false
    })
  }
  async componentDidMount() {
    this.UpdateNews()
  }
  hanlePrevClick = async () => {

    this.setState({ page: this.state.page - 1 })
    this.UpdateNews()
  }
  hanleNextClick = async () => {

    this.setState({ page: this.state.page + 1 })
    this.UpdateNews()
  }


  render() {
    console.log("render")
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsPedia - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((elem) => {
            return <div className="col-md-4 d-flex justify-content-center" key={elem.url}>

              <Newsitem title={elem.title ? elem.title : ""} description={elem.description ? elem.description : ""} imageUrl={elem.urlToImage} newsUrl={elem.url} author={elem.author} date={elem.publishedAt} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-center " >
          <div className="btn-group" role="group" aria-label="Basic outlined example">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-primary" onClick={this.hanlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-outline-primary" onClick={this.hanleNextClick}>Next &rarr;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default News