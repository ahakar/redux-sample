
import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppView from '../views/AppView';

export default connect()(AppView);



// function mapStateToProps(state) {
//   const { appData } = state;
//   return {
//     appData
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   const actions = { ...appDataActions };
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AppView);
