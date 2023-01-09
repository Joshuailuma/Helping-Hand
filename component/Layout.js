import Nav2 from './Nav2'
// This makes stuff to display on all pages
const Layout = ({children}) => {
  return (
    <>
    <Nav2/>
    <div >
        <main >{children}</main>
    </div>
    </>
  )
}

export default Layout