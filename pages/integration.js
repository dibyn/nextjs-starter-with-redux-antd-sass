import { connect } from 'react-redux'
import LandingPage from '../components/LandingPage'
const Component = {
  'landingPage': LandingPage
}
export const integration = ({ urlReducer }) => {
  const RenderComponent = Component[urlReducer.parentType]
  return <RenderComponent />
}
const mapStateToProps = (state) => ({
  urlReducer: state.urlReducer
})
export default connect(mapStateToProps, {})(integration)
