import React from 'react';
import api from '../utils/api';
import PropTypes from 'prop-types';

const SelectLanguage = (props) => {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <div>
      <p>Selected language: {props.selectedLanguage}</p>
      <ul className="languages">
        {languages.map((lang) => {
          return (
            <li
              style={
                lang === props.selectedLanguage ? { color: '#E30E08' } : {}
              }
              key={lang}
              onClick={props.onSelect.bind(null, lang)}>
              {lang}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const RepoGrid = ({ repos }) => {
  return (
    <ul className="popular-list">
      {repos.map((repo, index) => (
        <li key={repo.description_url} className="popular-item">
          <div className="popular-rank">#{index + 1}</div>
          <ul className="space-list-item">
            <li>
              <img
                className="avatar"
                src={repo.owner.avatar_url}
                alt={`Avatar for ${repo.owner.login}`}
              />
            </li>
            <li>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  );
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(lang) {
    this.setState(() => {
      return { selectedLanguage: lang };
    });

    api.fetchPopularRepos(lang).then((repos) => {
      this.setState({ repos });
    });
  }
  render() {
    const { repos } = this.state;
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos ? (
          <p>Loading some freshly baked repos</p>
        ) : (
          <RepoGrid repos={repos} />
        )}
      </div>
    );
  }
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Popular;
