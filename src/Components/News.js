import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
export class News extends Component {
  articles = []
constructor(){
  super();
  console.log("Hello")
  this.state={
articles:this.articles,
loading:false,
page:1
  }
}

async componentDidMount(){
console.log("cmp")
let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9db77eef4174b9b8af7ca428ca9c97f&pageSize=${this.props.pageSize}&page=1`
this.setState({loading:true})
let data = await fetch(url);
let paredData = await data.json()
console.log(paredData)
this.setState({articles:paredData.articles,
  totalResults: paredData.totalResults,
  loading:false})
}
hanlePrevClick = async () =>{
  console.log("prev")
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9db77eef4174b9b8af7ca428ca9c97f&pageSize=${this.props.pageSize}&page=${this.state.page-1}`
  this.setState({loading:true})
  let data = await fetch(url);
  let paredData = await data.json()
  console.log(paredData)
    this.setState({
   page:this.state.page -1,
   articles:paredData.articles,
   loading:false
    })
}
hanleNextClick = async () =>{
  if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
    console.log("next")
    console.log(this.state.page)
    console.log(this.state.totalResults)
this.setState({loading:true})
let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9db77eef4174b9b8af7ca428ca9c97f&pageSize=${this.props.pageSize}&page=${this.state.page+1}`

let data = await fetch(url);
let paredData = await data.json()
    console.log(paredData)
    this.setState({
      page:this.state.page +1,
      articles:paredData.articles,
      loading:false
    })
  }
}


  render() {
    console.log("render")
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsPedia - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((elem)=>{
          return  <div className="col-md-4 d-flex justify-content-center" key={elem.url}>
            
          <Newsitem  title={elem.title?elem.title:""} description={elem.description?elem.description:""} imageUrl={elem.urlToImage} newsUrl={elem.url}/>
              </div>
        })} 
        </div>
        <div className="container d-flex justify-content-center " >
        <div className="btn-group" role="group" aria-label="Basic outlined example">
  <button disabled={this.state.page<=1}type="button" className="btn btn-outline-primary" onClick={this.hanlePrevClick}>&larr; Previous</button>
  <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-outline-primary" onClick={this.hanleNextClick}>Next &rarr;</button>
</div>
        </div>
      </div>
    )
  }
}

export default News