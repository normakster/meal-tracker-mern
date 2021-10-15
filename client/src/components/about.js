import settings from '../config/settings';
const About = () => {
  const apiURL = settings.apiURL + (settings.apiPort ? ':' + settings.apiPort : '')  + '/api';
  const port = settings.apiPort;
  return (
    <div>
      <p>{apiURL}</p>
      <p>{port}</p>
      <hr />
      <h5>Summary & Status</h5>
      <br />
      <ul>
        <li>Tracks food items from Grocery through Pantry to Consumption as Nutrients.</li>
        <li>Compares historic data to goals and/or guidelines to influence behavior.</li>
        <li>To facilitate nutritional awareness and answer the question "What should I eat right now".</li>
      </ul>
      <p>This project is currently <b>incomplete</b> and for portfolio <b>demonstration purposes only</b>.</p>
      <p>Live Stack:
        <ul>
          <li>AWS EC2</li>
          <li>Kubernetes</li>
          <li>Traefik (Reverse Proxy)</li>
          <li>Docker (3x Containers)</li>
          <li>Docker Compose (Local)</li>
          <li>ReactJS (with Nginx for static serving)</li>
          <li>Node Express (with Mongoose for ODM)</li>
          <li>MongoDB</li>
        </ul>
      </p>
      <p>To Do:
        <ul>
          <li>Error Handling with UI indicators</li>
          <li>Data Validation: Pre/Post</li>
          <li>Https with Cert</li>
          <li>Helm Chart</li>
          <li>...</li>
        </ul>
      </p>
      <p>Github:  <a href="https://github.com/normakster/meal-tracker-mern">@Normakster</a></p>
      <hr/>
    </div>
  )
}

export default About
