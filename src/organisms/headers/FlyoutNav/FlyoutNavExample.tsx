import FlyoutNav from '.'

const ExampleFlyoutNav = () => {
  return (
    <>
      <FlyoutNav />
      <div
        className="relative min-h-screen"
        style={{
          backgroundImage: 'url(/imgs/random/12.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 z-0 bg-linear-to-b from-neutral-950/90 to-neutral-950/0" />
      </div>
      <div className="h-screen bg-neutral-50" />
    </>
  )
}

export default ExampleFlyoutNav
