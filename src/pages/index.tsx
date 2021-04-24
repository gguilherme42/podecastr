
/* 
Requisição no modelo SPA
  useEffect(() => {
      fetch('http://localhost:3333/episodes')
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])
 */

/*
Requisição no medo SSR
  exportando um função com esse nome o NextJS irá entender que a função deve ser executada antes do componente. 

  export async function getServerSideProps() {
    const response = await fetch('http://localhost:3333/episodes')
    const data = await response.json()

    return {
      props: {
        episodes: data,
      }
    }

  }

*/

/*
Requisição no modelo SSG
  exportando um função com esse nome o NextJS irá entender que a função deve ser executada antes do componente. 
  export async function getStaticProps() {
    const response = await fetch('http://localhost:3333/episodes')
    const data = await response.json()

    return {
      props: {
        episodes: data,
      },
      revalidate: 60 * 60 * 8, // 8 horas
    }
  }

*/


export default function Home(props) {
  
  

  return (
    <h1>Index</h1>
  )
}


export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // 8 horas
  }

}
