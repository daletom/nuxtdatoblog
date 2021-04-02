<template>
  <div class="p-4">
    <Hero />
    <div class="flex flex-wrap">
      <div class="p-4 lg:w-1/3 md:w-1/2 sm:w-full" v-for="blogPost in blogPosts" :key="blogPost.slug">
        <p class="text-2xl p-2" v-html="blogPost.title"></p>
        <datocms-image :data="blogPost.heroimage.responsiveImage" />
        <p class="p-2" v-html="blogPost.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { request, gql } from '~/lib/datocms'

export default {
  async asyncData({ params }) {
    const data = await request({
      query: gql`
      {
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
      `
    })

    return { read: !!data, ...data }
  }
}
</script>
