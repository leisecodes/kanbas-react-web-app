export default function Dashboard() {
    return (
      <div>
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
        <div id="wd-dashboard-courses">

          <div className="wd-dashboard-course">
            <img src="../images/yeti.jpg" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/Home">
                CZ1010
              </a>
              <p className="wd-dashboard-course-title">
              Intro to Cryptozoology
              </p>
              <a href="#/Kanbas/Courses/Home"> Go </a>
            </div>
            </div>

            <div className="wd-dashboard-course"> 
            <img src="../images/classroom2.jpg" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/Home">
                CZ1150
              </a>
              <p className="wd-dashboard-course-title">
                Field Methods in Cryptozoology
              </p>
              <a href="#/Kanbas/Courses/Home"> Go </a>
            </div>
            </div>

            <div className="wd-dashboard-course"> 
            <img src="../images/cryptid.jpg" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/Home">
                CZ2100
              </a>
              <p className="wd-dashboard-course-title">
                Advanced Cryptid Tracking
              </p>
              <a href="#/Kanbas/Courses/Home"> Go </a>
            </div>
          </div>

          <div className="wd-dashboard-course">
            <img src="../images/bigfoot.jpg" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/Home">
                CZ2510
              </a>
              <p className="wd-dashboard-course-title">
                Bigfoot Sociopsychology
              </p>
              <a href="#/Kanbas/Courses/Home"> Go </a>
            </div>
            </div>

            <div className="wd-dashboard-course">
            <img src="../images/classroom.jpg" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/Home">
                CZ2700
              </a>
              <p className="wd-dashboard-course-title">
                Kraken Ethnography
              </p>
              <a href="#/Kanbas/Courses/Home"> Go </a>
            </div>
            </div>

            <div className="wd-dashboard-course">
            <img src="../images/moth.jpg" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/Home">
                CZ2810
              </a>
              <p className="wd-dashboard-course-title">
                Mothman Veterinary Studies
              </p>
              <a href="#/Kanbas/Courses/Home"> Go </a>
            </div>
            </div>

            <div className="wd-dashboard-course">
            <img src="../images/serpent.jpg" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/Home">
                CZ3100
              </a>
              <p className="wd-dashboard-course-title">
                Contemporary Seaserptentology
              </p>
              <a href="#/Kanbas/Courses/Home"> Go </a>
            </div>
            </div>

        </div>
        </div>
  );}
  