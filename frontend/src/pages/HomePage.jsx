import MainLayout from "../layout/MainLayout";
import PopUp from "../components/PopUp";
import "./HomePage.css"
function HomePage() {

  return (
    <> 
    <PopUp/>
      <MainLayout>
        <img className="heritageImage" src="./heritage.png" alt="Heritage image"/>
        {/* <div id="homePage" >
          <div><h1>A Legacy of Excellence</h1></div>   
          <div className="homeContent">
          <p>
        <strong>Historical Background:</strong> Established in 1926 as the Indian School of Mines (ISM). Initially focused on mining and earth sciences. Upgraded to Indian Institute of Technology (IIT) in 2016. 
        <br/><br/>
        <strong>Academic Excellence:</strong> Renowned for engineering, applied sciences, and management programs. Strong emphasis on research and innovation. State-of-the-art laboratories and research facilities. Highly qualified faculty with global recognition. 
        <br/><br/>
        <strong>Research and Innovation:</strong> Pioneering research in mining, petroleum, and earth sciences. Significant contributions to energy, environment, and sustainability. Collaborations with leading global universities and industries. 
        <br/><br/>
        <strong>Industry Collaborations:</strong> Strong ties with major industries for research and development. Regular industry-academia interactions and partnerships. Internships and placements with top companies globally. 
        <br/><br/>
        <strong>Student Achievements:</strong> Graduates excelling in various fields worldwide. Strong entrepreneurial spirit with numerous successful startups. Active participation in national and international competitions. 
        <br/><br/>
        <strong>Campus Facilities:</strong> Modern infrastructure with advanced classrooms and labs. Comprehensive library with extensive resources. Hostels, sports complexes, and recreational facilities. 
        <br/><br/>
        <strong>Commitment to Society:</strong> Initiatives for community development and social responsibility. Focus on sustainable and inclusive growth. Programs to support underprivileged and marginalized communities.
        </p>
          </div>

        </div> */}
<div id="homePage">
  <div className="titleContainer">
    <h1 className="animatedTitle">A Legacy of Excellence</h1>
  </div>
  <div className="homeContent">
    <div className="contentBlock slideInLeft">
      <p>
        <strong>Historical Background:</strong> Established in 1926 as the Indian School of Mines (ISM). Initially focused on mining and earth sciences. Upgraded to Indian Institute of Technology (IIT) in 2016.
      </p>
    </div>
    <div className="contentBlock slideInRight">
      <p>
        <strong>Academic Excellence:</strong> Renowned for engineering, applied sciences, and management programs. Strong emphasis on research and innovation. State-of-the-art laboratories and research facilities. Highly qualified faculty with global recognition.
      </p>
    </div>
    <div className="contentBlock slideInLeft">
      <p>
        <strong>Research and Innovation:</strong> Pioneering research in mining, petroleum, and earth sciences. Significant contributions to energy, environment, and sustainability. Collaborations with leading global universities and industries.
      </p>
    </div>
    <div className="contentBlock slideInRight">
      <p>
        <strong>Industry Collaborations:</strong> Strong ties with major industries for research and development. Regular industry-academia interactions and partnerships. Internships and placements with top companies globally.
      </p>
    </div>
    <div className="contentBlock slideInLeft">
      <p>
        <strong>Student Achievements:</strong> Graduates excelling in various fields worldwide. Strong entrepreneurial spirit with numerous successful startups. Active participation in national and international competitions.
      </p>
    </div>
    <div className="contentBlock slideInRight">
      <p>
        <strong>Campus Facilities:</strong> Modern infrastructure with advanced classrooms and labs. Comprehensive library with extensive resources. Hostels, sports complexes, and recreational facilities.
      </p>
    </div>
    <div className="contentBlock slideInLeft">
      <p>
        <strong>Commitment to Society:</strong> Initiatives for community development and social responsibility. Focus on sustainable and inclusive growth. Programs to support underprivileged and marginalized communities.
      </p>
    </div>
  </div>
</div>


      </MainLayout>
    </>
  );
}
export default HomePage;
