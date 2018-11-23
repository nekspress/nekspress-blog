import React from 'react'
import './style.scss'
// import '../../assets/fonts/fontello-771c82e0/css/fontello.css'
import '../../assets/fonts/fontello-8261aea6/css/fontello.css'

class Links extends React.Component {
  render() {
    const author = this.props.data
    const links = {
      twitter: author.twitter,
      gitlab: author.gitlab,
      rss: author.rss,
    }

    return (
      <div className="links">
        <ul className="links__list">
          <li className="links__list-item">
            <a
              href={`https://www.gitlab.com/${links.gitlab}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icon-gitlab" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={`https://www.twitter.com/${links.twitter}`} target="_blank" >
              <i className="icon-twitter" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={links.rss}>
              <i className="icon-rss" />
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Links
