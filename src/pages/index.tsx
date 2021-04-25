import {GetStaticProps} from 'next';

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

interface IEpisode {
  id: string;
  title: string;
  members: string;
}

interface IHomeProps {
  episodes: IEpisode[]
}

export default function Home(props: IHomeProps) {


  return (
    <h1>Index</h1>
  )
}


export const getStaticProps: GetStaticProps =  async () => {
  const response = await fetch('http://localhost:3333/episodes?_limit=12&_sort=published_at')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // 8 horas
  }

}
