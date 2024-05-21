import "./styles.css";

export default function Dashboard() {
    return (
      <div>
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr className="wd-pagebreak" />
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row cols-md-5 g-4">

          <div className="wd-dashboard-course col" style={{width: "260px"}}>
            <div className="card">
              <img src="../images/yeti.jpg" height="175px"/>
                <div className="card-body">
                    <a className="wd-dashboard-course-link"
                      href="#/Kanbas/Courses/Home"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                      CS1234 React JS
                    </a>
                    <p className="wd-dashboard-course-title card-text">
                    Intro to Cryptozoology
                    </p>
                    <a href="#/Kanbas/Courses/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{width: "260px"}}>
              <div className="card">
              <img src="../images/classroom2.jpg"  height="175px" />
                <div className="card-body">
                  <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/Home" 
                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                  CZ1150
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                   CZ Field Methods
                  </p>
                  <a href="#/Kanbas/Courses/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{width: "260px"}}>
              <div className="card">
              <img src="../images/cryptid.jpg"  height="175px"/>
                <div className="card-body">
                  <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/Home" 
                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                  CZ2100
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                  Advanced Cryptid Tracking
                  </p>
                  <a href="#/Kanbas/Courses/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{width: "260px"}}>
              <div className="card">
              <img src="../images/bigfoot.jpg"  height="175px" />
                <div className="card-body">
                  <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/Home" 
                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                  CZ2510
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                  Bigfoot Sociopsychology
                  </p>
                  <a href="#/Kanbas/Courses/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col" style={{width: "260px"}}>
              <div className="card">
              <img src="../images/classroom.jpg"  height="175px" />
                <div className="card-body">
                  <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/Home" 
                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                  CZ2700
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                  Kraken Ethnography
                  </p>
                  <a href="#/Kanbas/Courses/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>


            <div className="wd-dashboard-course col" style={{width: "260px"}}>
              <div className="card">
              <img src="../images/moth.jpg"  height="175px" />
                <div className="card-body">
                  <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/Home" 
                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                  CZ2810
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                  Mothman Veterinary Studies
                  </p>
                  <a href="#/Kanbas/Courses/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>


            <div className="wd-dashboard-course col" style={{width: "260px"}}>
              <div className="card">
              <img src="../images/serpent.jpg"  height="175px" />
                <div className="card-body">
                  <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/Home" 
                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                  CZ3100
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                  Modern Seaserptentology
                  </p>
                  <a href="#/Kanbas/Courses/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>
            </div>
        </div>
        </div>
  );}
  