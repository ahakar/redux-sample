
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as profileActions from '../redux/modules/profile';
import ProfileView from '../views/ProfileView';

function mapStateToProps(state) {
  const { profile } = state;
  return {
    profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(profileActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
