const colors = [
    { "name": "Illuminating", "hex": "#F5DF4D" },
    { "name": "Classic Blue", "hex": "#0f4c81" },
    { "name": "Living Coral", "hex": "#FA7268" },
    { "name": "Ultra Violet", "hex": "#5f4b8b" },
    { "name": "Greenery", "hex": "#88b04b" },
    { "name": "Rose Quartz", "hex": "#F7CAC9" },
    { "name": "Marsala", "hex": "#B57170" },
    { "name": "Radiant Orchid", "hex": "#b067a1" }
  ]

export async function getStaticPaths() {
  const paths = colors.map(color => ({
    params: { color: color.name }
  }))

  console.log(paths);
  return { paths, fallback: false }
}

// [color].js
export async function getStaticProps({ params }) {
    // find the info for just one color
    const color = colors.find(color => color.name === params.color)
    // return it in the necessary format.
    return { props: { color } }
  }

  // [color.js]
export default function Color({ color }) {
    return <div className='color-page' style={{ backgroundColor: color.hex }}>
      <h1>{color.name}</h1>
    </div>
  }