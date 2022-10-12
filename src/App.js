import { Page, EditableComponent } from '@adobe/aem-react-editable-components';
import React from 'react';

// This component is the application entry point
const App = (props) => {
  return <EditableComponent {...props}><Page {...props} /></EditableComponent>
}

export default App;
