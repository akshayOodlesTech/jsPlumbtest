/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
// import {getUsers} from '../../actions/users'
import './landing.module.scss';
import PasswordFeild from '../../components/password-feild';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Images from '../../assets/asset_imports';

const features1 = [
  {
    id: 'f1',
    title: "Versatile precision",
    line_color: "#33A7FF"
  },
  {
    id: 'f2',
    title: "Fast deployment",
    line_color: "#3333FF"
  },
  {
    id: 'f3',
    title: "Continuous improvement",
    line_color: "#FF7979"
  },
  {
    id: 'f4',
    title: "Effort reduction",
    line_color: "#3333FF"
  },
  {
    id: 'f5',
    title: "Extensibility",
    line_color: "#FF7979"
  },
  {
    id: 'f6',
    title: "Enterprise grade",
    line_color: "#33A7FF"
  }
]

const features2 = [
  {
    id: 'w1',
    title: "Your Specific Environment",
    line_color: "#3333FF"
  },
  {
    id: 'w2',
    title: "Your Specific Process",
    line_color: "#FF7979"
  },
  {
    id: 'w3',
    title: "Your Specific Data",
    line_color: "#33A7FF"
  }
]

const FeatureCard = ({title,line}) => <div className="col-lg-4 col-md-6" data-aos="zoom-in">
<div className="box">
  <div className="form-inline form-group">
    <img src={Images.tree_icon} width="20" height="20" alt="nature"/>
  </div>
  <h4 className="title">{title}</h4>
  <div className="feature-basebar" style={{backgroundColor:line}}></div>
  <h6 className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</h6>
</div>
</div>


const Landing = () => {

  // const dispatch = useDispatch();
  // const users = useSelector(state => state.users.users);
  // const loading = useSelector(state => state.users.loading);
  // const error = useSelector(state => state.users.errors);

  useEffect(()=>{
    // dispatch(getUsers());

    $(window).on("scroll", function() {
      if($(window).scrollTop() > 50) {
          $(".navbar").addClass("dimmed");
      } else {
          //remove the background property so it comes transparent again (defined in your css)
         $(".navbar").removeClass("dimmed");
      }
  });

  document.getElementById("menuicon").style.backgroundImage = `url("${Images.menu_icon}")`;
  document.getElementById("diagram").style.backgroundImage = `url("${Images.brain_bg}")`;
  },[])

return(
<>
<nav  id="header" class="navbar navbar-expand-lg justify-content-between">
<a class="navbar-brand" href="/">
    <img src={Images.app_logo} width="146" height="55" alt=""/>
  </a>
  {/* {
       console.log("11",users)
     }

    {
       console.log("22",loading)
     }
     {
       console.log("33",error)
     } */}
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span id="menuicon" class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="nav-menu" style={{height:'30px'}}>
          <li class="menu-active"><a href="index.html">Product</a></li>
          <li class="menu-has-children"><a href="#about">Pricing Solution<i class="fa fa-chevron-down"></i></a>
            <ul className="drop_menu">
              <li><a href="#">Option A</a></li>
              <li class="menu-has-children"><a href="#">Option B</a>
                <ul>
                  <li><a href="#">Option B1</a></li>
                  <li><a href="#">Option B2</a></li>
                  <li><a href="#">Option B3</a></li>
                  <li><a href="#">Option B4</a></li>
                  <li><a href="#">Option B5</a></li>
                </ul>
              </li>
              <li><a href="#">Option C</a></li>
              <li><a href="#">Option D</a></li>
              <li><a href="#">Option E</a></li>
            </ul>
          </li>
          <li><a href="#services">Developers</a></li>
          <li><a href="#portfolio">Partners</a></li>
          <li><a href="#team">Supports</a></li>
          <li class="menu-has-children"><a href="">Company</a></li>
          <li class="menu-has-children"><a href="">Blog</a></li>

          <li><a href="/Login">Sign in</a></li>
        </ul>
        <button class="btn trial_btn my-2 my-sm-0" type="submit">Free Trial</button>
  </div>
</nav>

  <main id="main">

    {/* <!-- ======= About Section ======= --> */}
    <section id="about">
      <div className="container" data-aos="fade-up">
        <div className="row about-container">

          <div className="col-lg-6 content order-lg-1 order-2">
            <h2 className="title">EXTRACT INVOICE DATA FASTER THAN EVER</h2>
            <h6 className="intro-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </h6>
            <a href="#about" className="btn-free-trial">Free Trial</a>
            <a href="#lets_start" className="btn-get-started">Get Started</a>
          </div>

          <div className="col-lg-6 background order-lg-2 order-1" data-aos="fade-left" data-aos-delay="100"></div>
        </div>

      </div>
      {/* <br/><br/><br/><br/><br/><br/> */}

    </section>

<div id="details" style={{position:'relative'}}>
<div className="section-header">
          <h5 className="section-title">TRUSTED BY COMPANIES OF ALL SIZES</h5>
          <div className="d-flex counters justify-content-center mt-4">

          {[1,2,3,4,5,6].map(item => 
            <div className="col-sm-1 text-center">
            <i className="fa fa-google" style={{fontSize:'52px',color:'#C0C0C0'}} aria-hidden="true"></i>
            <h6>Google</h6>
          </div>            
            )
          }
          </div>
      </div>
      <div className="d-flex">
            <div className="container elevated-card">
              <div className="col-lg-6">
              <h5 className="card-title">WE SAY “NO” TO MANUAL INVOICE PROCESSING</h5>
              </div>
              <div className="col-lg-5 justify-content-center align-items-center" style={{display:'flex'}}> 
              <div>
              <h6 className="card-text" style={{marginBottom:'25px'}}>Automated invoice data capture streamlines your AP process with accuracy and affordability that traditional OCR solutions can't match.</h6>
              <a className="gradBtn btn-1" style={{margin:'0'}}>See a better way to capture data 🠮</a>
              </div>
              </div>
            </div>
            </div>
            <br/><br/><br/><br/><br/><br/>
     <div className="d-flex justify-content-start container">       
    <div className="div-note col-9">YOUR COMPANY CAN AUTOMATE INVOICE DATA CAPTURE TODAY</div>
 </div>
 </div>   



    {/* <!-- ======= Services Section ======= --> */}
    <section id="services">
      <div className="container" data-aos="fade-up">
        <div className="row">
          {
            features1.map( (item,index) => 
            <FeatureCard title={item.title} line={item.line_color}/>
          )}
        </div>
      </div>
    </section>

       {/* <!-- ======= diagram section ======= --> */}
       <div id="diagram">
      <div className="container" data-aos="fade-up">
        <div className="diagram-container">
    <div className="container diagram-note col-9">Convo OCR Can make cognitive invoice data capture this simple for you</div>
    

       {/* <div className="row justify-content-center">
         <img src={Images.data_flow} alt="boilerplate workflow" align="center" />
        </div> */}
        </div>

      </div>
      <div className="diag-footer">
      <div className="col-6 d-flex justify-content-end align-items-center" style={{borderRight:'1px solid #fff'}}>
        <div className="col-4 p-0">
        <h5>AI extracts data</h5>
        <h6 className="text-left">and learns from human feedback</h6>
       </div>
       </div>
       <div className="col-6 d-flex justify-content-start align-items-center">
       <div className="col-5 p-0">
        <h5>Human operator reviews and corrects if necessary.</h5>
       </div> 
       </div> 
    </div>
    </div>

        {/* <!-- ======= Services Section ======= --> */}
  <section id="caveats">
      <div className="container" data-aos="fade-up">
    <div className="container div-note">EXTRICATOR CAN EASILY ADAPT TO SUIT YOUR ORGANIZATION'S NEEDS</div>

        <div className="row caveats-b">
          {
            features2.map( (item,index) => 
              <FeatureCard title={item.title} line={item.line_color}/>
          )}
        </div>
        <div className="container mb-4">
        <a href="#">Read more</a>
          </div>
        
      </div>
    </section>

    <section id="testimonials">
          <div className="title pt-2">Testimonials
          <div className="remarks-container container">
          {[1,2,3].map(item => {
           return(
            <div class="card col-4 mx-3" style={{backgroundColor:'#68A5FF'}}>
            <div class="card-body">
            <h5 className="remark"><em>"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed "</em></h5>
                <div className="form-inline">
                <div>
                  <h5 class="mb-0 text-left">Lorem Ipsum</h5>
                  <h6>Lorem ipsum dolor sit amet</h6>
                </div>
                </div>
            </div>
          </div>
           )
          } )}  
          </div>

          </div>
          <div className="bg-white">
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          </div> 
  
    </section>


  </main>

  {/* <footer id="footer">
    <div className="footer-top">
      <div className="container">

      </div>
    </div>

    <div className="container">
      <div className="copyright">
        &copy; Copyright <strong>CONVO-OCR</strong>. All Rights Reserved
      </div>
    </div>
  </footer> */
  }

<footer>
  <div className="col-8 footer-intro container mb-5">
    <h4>EXTRACT DATA FROM YOUR INVOICES IN 1 MINUTE</h4>
    <div className="try-btn">Try it for free</div>
  </div>
  <div className="d-flex justify-content-end">
   <div className="col-4 p-0">
   <div class="d-flex container footer-links">
        <div class="col-1 col-md">
          <h6>Company</h6>
          <ul class="list-unstyled text-small">
            <li><a class="text-muted" href="#">About</a></li>
            <li><a class="text-muted" href="#">Careers</a></li>
          </ul>
        </div>
        <div class="col-1 col-md">
          <h6>Products</h6>
          <ul class="list-unstyled text-small">
            <li><a class="text-muted" href="#">Features</a></li>
            <li><a class="text-muted" href="#">Integrations</a></li>
            <li><a class="text-muted" href="#">Pricing</a></li>
            <li><a class="text-muted" href="#">Login</a></li>
          </ul>
        </div>
        <div class="col-1 col-md">
          <h6>Resources</h6>
          <ul class="list-unstyled text-small">   
            <li><a class="text-muted" href="#">Cognitive Data Capture</a></li>
            <li><a class="text-muted" href="#">Customers</a></li>
            <li><a class="text-muted" href="#">Case Studies</a></li>
            <li><a class="text-muted" href="#">Use cases</a></li>
            <li><a class="text-muted" href="#">Terms of Service</a></li>
            <li><a class="text-muted" href="#">FAQ</a></li>
          </ul>
        </div>
      </div>
     </div>
     <div className="col-6 newsletter">
     <div class="col-1 col-md">
          <h6>Newsletter</h6>
          <ul class="list-unstyled text-small">
            <li><a class="text-muted" href="#">Get Extricator news and product updates.</a></li>
            <form class="form-inline">
            <div class="form-group col-8 pl-0">
              <input type="email" class="form-control" placeholder="Your Email" style={{width:'100%'}}/>
            </div>
            <button type="submit" class="btn">Subscribe</button>
          </form>
          </ul>
        </div>
     </div>
   </div> 

    </footer>

  <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
</>
);
}

export default Landing;
