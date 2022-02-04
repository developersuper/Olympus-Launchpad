<template>
  <div class="mt-4">
    <p class="text-sm mt-2 mb-4 font-semibold text-center ">TOKEN ICON (500px - 500px)</p>
    
    <div 
      id="img-container" 
      :class="[!imageLoaded ? 'px-6 pt-5 pb-6' : '','max-w-24 m-auto flex justify-center border-2 border-gray-500 border-dashed rounded-xl']">
      <div v-if="!imageLoaded" class="space-y-2 text-center justify-center flex items-center">
        <div class="flex text-sm text-gray-400 rounded-full">
          <label for="file-upload" class="rounded-full relative cursor-pointer bg-gray-700 px-3 py-1 rounded-md font-medium text-indigo-600 hover:text-white focus-within:outline-none focus-within:ring-1 focus-within:ring-launchpad_primary">
            <span><i class="fa fa-plus text-base text-gray-200 hover:text-gray-100"></i></span>
          </label>
        </div>
      </div>
      <div v-else 
        id="preview" 
        class="max-w-24 m-auto"
        @click="selectImage"
      >
        <img :src="img.src" alt="" />
      </div>
      <input
        id="file-upload" 
        name="file-upload" 
        type="file" 
        ref="myFile" 
        @change="selectedFile" 
        accept="image/*"
        class="sr-only" 
      />
    </div>

     <div v-if="imageError !== ''" class="text-center text-error-red error-msg">{{ imageError }}</div>
  </div>
  
</template>
<script>
// import { ref } from 'vue';

const MAX_SIZE = 100000;
const MAX_WIDTH = 500;
const MAX_HEIGHT = 500;

export default {
  props: {
  },
  data() {
    return {
      img: null,
      image:{
        size:'',
        height:'',
        width:''
      },
      imageLoaded:false,
      imageError:''
    }
  },
  methods:{
    selectedFile() {
      this.imageLoaded = false;
      this.imageError = '';
      
      let file = this.$refs.myFile.files[0];
      if(!file || file.type.indexOf('image/') !== 0) return;
      
      this.image.size = file.size;
      
      this.image.size = file.size;

      if(this.image.size > MAX_SIZE) {
        this.imageError = `The image size (${this.image.size}) is too much (max is ${MAX_SIZE}).`;
        return;
      }

      let reader = new FileReader();   
      
      reader.readAsDataURL(file);

      reader.onload = evt => {
        this.img = new Image();
        this.img.onload = () => {
          this.image.width = this.img.width;
          this.image.height = this.img.height;
          if(this.image.width > MAX_WIDTH) {
            this.imageError = `The image width (${this.image.width}) is too much (max is ${MAX_WIDTH}).`;
            return;
          }
          if(this.image.height > MAX_HEIGHT) {
            this.imageError = `The image height (${this.image.height}) is too much (max is ${MAX_HEIGHT}).`;
            return;
          }
          this.imageLoaded = true;
          this.$emit('loaded', file);
        }
        this.img.src = evt.target.result;
      }

      reader.onerror = evt => {
        console.error(evt);
      }
      
    },
    selectImage () {
      this.$refs.myFile.click()
    },
  }
}
</script>
<style scoped scss>
#img-container{
  max-height: 96px;
  height: 96px;
  width: 96px;
  overflow: hidden;
} 
</style>