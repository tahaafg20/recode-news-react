import React from 'react';
import logo from './logo.svg';
import './App.css';
class App extends React.Component {

  // initializing the class
  // inheriting from class to be able to use "this" keyword

  constructor(props){
    super(props)
    this.state = {

    // news array to save all the articles data from api
    // title just something to display as a header different for every category

      news: [],
      title: ""
    }
  }
  
  // a function that is supposed to fetch the data from newsapi whenever the button on category is clicked and after that saves the data from api to the states (DRY RULE!!!)

  fetchFromApi(country){

    // define a base url to use for fetch and since the link is completely the same except name of countries we can use an argument for the name of country and prevent using the same link everytime (DRY RULE!!!)

    const baseUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=a2c75b44756c4b6db41e5b98c46d65f1`
    fetch(`${baseUrl}`)
      .then(res => res.json())
      .then(data => {

        // set the news with the result of api response

        this.setState({news: data.articles})

        // set the title using the name of country 

        this.setState({title: (country === "us") ? "Top Headlines From United States" : `${this.state.title}`})
        this.setState({title: (country === "sg") ? "Top Headlines From Singapore" : `${this.state.title}`})
        this.setState({title: (country === "ca") ? "Top Headlines From Canada" : `${this.state.title}`})
        this.setState({title: (country === "my") ? "Top Headlines From Malaysia" : `${this.state.title}`})
    })
    .catch(console.log);
  }
  componentDidMount(){

    // since the default page that every time loads is the headlines from US and this method which is called everytime page loads and there is no error so I set the argument to US

    this.fetchFromApi("us")
  }
  handleClickUs = () => {

    // handling the click on the us link

    this.fetchFromApi("us")
  };
  handleClickSg = () => {

    // handling the click on the singapore link

    this.fetchFromApi("sg")
  };
  handleClickCa = () => {

    // handling the click on the canada link

    this.fetchFromApi("ca")
  };
  handleClickMy = () => {

    // handling the click on the malaysia link

    this.fetchFromApi("my")
  };
  render() { 
    return ( 
    <div className="mt-3 App"><br/>

      {/* rendering the navbar */}

    <nav>
        <div className='container text-left'>
          <div className='container row'>
            <div className='square-yellow'></div><h5>REALBOX</h5></div>
        </div>
      <br/>
        <div className="container nav nav-tabs" id="nav-tab" role="tablist">
          <a
            className="nav-item nav-link active"
            id="nav-home-tab"
            data-toggle="tab"
            onClick={this.handleClickUs}
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
            >
            Top Headlines From United States
          </a>
          <a
            className="nav-item nav-link "
            id="nav-profile-tab"
            data-toggle="tab"
            onClick={this.handleClickSg}
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Top Headlines From Singapore
          </a>
          <a
            className="nav-item nav-link"
            id="nav-contact-tab"
            data-toggle="tab"
            onClick={this.handleClickCa}
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Top Headlines From Canada
          </a>
          <a
            className="nav-item nav-link"
            id="nav-contact-tab"
            data-toggle="tab"
            onClick={this.handleClickMy}
            role="tab"
            aria-controls="nav-message"
            aria-selected="false"
          >
            Top Headlines From Malaysia
          </a>
          </div>
        </nav>
        <br/>
        <h4>{this.state.title}</h4>
        <br/>
        <div className="container mt-3">
          <div className="row d-flex justify-content-center text-left">

      {/* iterating over the array of news in states which is now populated by the response from api */}

      {this.state.news.map((article, index) =>{
        return(
          
          <div className="col-lg-4 col-md-6 mb-3" key={index}>

            {/* giving every card on the page a unique key */}

          <div className="card h-100">
          <div style={{height:'18rem'}}>
          <img
              src={article["urlToImage"]}
              className="card-img-top"
              alt="news image"
            />
            </div>
            <div className="card-body">
              <h5 className="card-title">{article["title"]}</h5>
              <p className="card-text">
                  {article["description"]}
              </p>
              <p className="card-text">
                  Source: {article["source"].name}
              </p>
              <i className="card-text">
                  Published At: {article["publishedAt"]}
                </i>
            </div>
            <div className="" style={{padding:'1.5rem'}}>
              <a
                  href={article["url"]}
                  className="btn btn-primary">
                  Read More
              </a>
            </div>
          </div>
        </div>
        )
      }
    )}
      </div>
    </div>
  </div>
     );
  }
}
 
export default App;
