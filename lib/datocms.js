import axios from 'axios'
import gql from 'graphql-tag'

export { default as gql } from 'graphql-tag'

export async function request({ query, variables, preview }) {
  let endpoint = 'https://graphql.datocms.com';

  if (process.env.NUXT_ENV_DATOCMS_ENVIRONMENT) {
    endpoint += `/environments/${process.env.DATO_API_TOKEN}`;
  }

  if (preview) {
    endpoint += '/preview';
  }

  const { data } = await axios.post(
    endpoint,
    {
      query: query.loc && query.loc.source.body,
      variables
    },
    {
      headers: {
        Authorization:
          `Bearer ${process.env.DATO_API_TOKEN}`
      }
    }
  )

  if (data.errors) {
    throw JSON.stringify(data.errors)
  }

  return data.data
}

/*export const query = gql`
  query AppQuery {
    blogPosts: allPosts {
      id
      title
      content
      heroimage {
        responsiveImage(imgixParams: {fit: crop, w: 350, h: 175, auto: format}) {
          aspectRatio
          base64
          height
          src
          srcSet
          width
          alt
          sizes
          title
        }
      }
    }
  }
`;*/