<template>
  <div class="my-lazy">
    <ul class="lazy-box">
      <li v-for="image in images" :key="image.id">
        <img :src="image.url" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'MyLazy',
    data () {
      return {
        images: []
      };
    },
    mounted () {
      this.getImages();
    },
    methods: {
      request () {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', 'https://jsonplaceholder.typicode.com/albums/1/photos');
          xhr.addEventListener('readystatechange', (e) => {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.response));
            }
          });
          xhr.send();
        });
      },
      getImages () {
        this.request().then(res => {
          // console.log(res);
          this.images = res;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .my-lazy {
    ul li {
      list-style: none;
    }
    .lazy-box {
      padding: 0;
      margin: 60px auto 0;
      border: 2px solid red;
      height: 80vh;
      width: 400px;
      overflow-y: auto;
      img {
        vertical-align: top;
        width: 400px;
        height: 400px;
      }
    }
  }
</style>
