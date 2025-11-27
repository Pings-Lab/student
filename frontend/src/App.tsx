import React from 'react'
import './App.css'
import resource from './assets/resource.png'
import tools from './assets/tools.png'
import projects from './assets/projects.png'
import avatar from './assets/avatar.png'

const App = () => {
  return (
    <div id='body'>
      <div id="page1">
        <div id="page1-top">
          <div id="page1-text">
          The best Platform where you will learn to build impactful solutions.
          <p>Learn, Practice, Collab with group and more.</p>
          <div>
            <a href="#">Explore</a>
          <a href="#">Join</a>
          <a href="#">Login</a>
          </div>
          </div>
           <div id='page1-img' >
            <img src={avatar} alt="" />
            </div>   
        </div>
         
          <div id='page1-bottom' ></div>
          
      </div>
      <div id="page2">
        <div className='pagehead'>
          Why Choose Us?
        </div>
        <div id="page2-top">
          <div className="box">
            <img src={resource} alt="" />
            <p>Free Resources</p>
          </div>
          <div className="box">
            <img src={tools} alt="" />
            <p>Tools & Design</p>
          </div>
          <div className="box">
            <img src={projects} alt="" />
            <p>Projects & more</p>
          </div>
        </div>
       
        <div id='page2-bottom'>
           
         
          <div className="box">
            <img src={resource} alt="" />
            <p>Free Resources</p>
          </div>
          <div className="box">
            <img src={tools} alt="" />
            <p>Tools & Design</p>
          </div>
           <div className="box">
            <img src={tools} alt="" />
            <p>Tools & Design</p>
          </div>
           <div className="box">
            <img src={tools} alt="" />
            <p>Tools & Design</p>
          </div>
           <div className="box">
            <img src={tools} alt="" />
            <p>Tools & Design</p>
          </div>
        </div>
      </div>
      <div id="page3">
        <div className="pagehead">What we offer?</div>
        <div id="page3-con">
          <div className="box">
            <img src={resource} alt="" />
            
            <div className="text">
              <p>Cool LMS</p>
              Apply for any internship, check your progress, leadboard , maintain attendance and more.
            </div>
          </div>
          <div className="box">
            <img src={resource} alt="" />
            
            <div className="text">
              <p>Projects</p>
              Real life projects with indemand tech stack.Industry grade development details
            </div>
          </div>
          <div className="box">
            <img src={resource} alt="" />
            
            <div className="text">
              <p>Learning resources</p>
              Free resources selected and filtered with a creative and disciplined approach.
            </div>
          </div>
          <div className="box">
            <img src={resource} alt="" />
            
            <div className="text">
              <p>Internship Certificate</p>
              Earn a certificate on successful internship completion and perks for top performers.
            </div>
          </div>
          <div className="box">
            <img src={resource} alt="" />
            
            <div className="text">
              <p>Teamwork</p>
              Opportunity to collab and work with like minded people and batchmates.
            </div>
          </div>
          <div className="box">
            <img src={resource} alt="" />
            
            <div className="text">
              <p>Job News</p>
              Get latest updates on jobs and internships. New tech blogs reccomendation.
            </div>
          </div>
        </div>

      </div>
      <div id="page1">
        <div id="page1-top">
          <div id="page1-text">
          Join now and gain hands on knowledge and experience. Make a difference.
          <p>Contact us for queries</p>
          <div>
            <a href="#">Explore</a>
          <a href="#">Join</a>
          <a href="#">Login</a>
          </div>
          </div>
           <div id='page1-img' >
            <img src={avatar} alt="" />
            </div>   
        </div>
         
          <div id='footer' ></div>
          
      </div>
    </div>
  )
}

export default App