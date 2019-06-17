// check the project for update, errors, ...
// todo: make it an injectable service & crete route: /admin/check
import npmCheck from 'npm-check';

// check for node_module updates with npm-check; or: > npm run check
npmCheck().then(currentState => console.log(currentState.get('packages')));
