import settings from '../config/settings';
const About = () => {
  const apiURL = settings.apiURL + (settings.apiPort ? ':' + settings.apiPort : '')  + '/api';
  const port = settings.apiPort;
  return (
    <div>
      <hr />
      <h5>Summary & Status</h5>
      <p>{apiURL}</p>
      <p>{port}</p>
      <br />
      <ul>
        <li>Tracks food items from Grocery through Pantry to Consumption as Nutrients.</li>
        <li>Compares historic data to goals and/or guidelines to influence behavior.</li>
        <li>To facilitate nutritional awareness and answer the question "What should I eat right now".</li>
      </ul>
      <p>This project is currently <b>incomplete</b> and for portfolio <b>demonstration purposes only</b>.</p>
      <p>Github:  <a href="https://github.com/normakster/meal-tracker-mern">@Normakster</a></p>
      <hr/>
    </div>
  )
}

export default About
