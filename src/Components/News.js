import React, { useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props)=>{
const [articles, setArticles] = useState([])
const [loading, setLoading] = useState(true)
const [page, setPage] = useState(1)
const [totalResult, setTotalResult] = useState(0)
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async()=> {
      props.setProgress(10)
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
      let data = await fetch(url);
      props.setProgress(30)
      let parsedData = await data.json()
      props.setProgress(70)
      setArticles(parsedData.articles)
      setTotalResult(parsedData.totalResult)
      setLoading(false)
      props.setProgress(100)

    }


    useEffect(() => {
      updateNews();
      document.title = `${ capitalizeFirstLetter(props.category)} - NewsPedia`;
    }, [])
    
    const fetchMoreData = async () => {  
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResult(parsedData.totalResults)
      };

        return (
            <div className="container my-3">
                <h1 className="text-center" style={{marginTop:'90px'}}>NewsPedia - Top { capitalizeFirstLetter(props.category)} Headlines</h1>
                { loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={ fetchMoreData}
                    hasMore={ articles.length !==  totalResult}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        { articles.map((element) => {
                            return <div className="col-md-4 d-flex justify-content-center" key={element.url}>
                                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>

            </div>
        )
    
}


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News