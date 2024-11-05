interface paramss{
  params: {
    dynamic: string
  }
}
function page({params}: paramss) {
  const {dynamic} = params
  return (
    <div>
      <h1 className='bg-white'>this is dynamic route of {dynamic}</h1>
    </div>
  )
}

export default page
