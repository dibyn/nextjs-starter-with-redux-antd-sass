import { wrapper, changeUrl } from '../store'
import 'antd/dist/antd.min.css'
import './../styles/dashboard.scss'
const App = ({ Component, pageProps }) => <Component {...pageProps} />
App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  let query = ctx.query
  await ctx.store.dispatch(changeUrl(query))
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return {
    pageProps,
  }
}
export default wrapper.withRedux(App)
