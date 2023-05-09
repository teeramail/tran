<template>
  <div>
    <h1>Upload an Image</h1>
    <form @submit.prevent="submitForm">
      <input type="file" accept="image/*" @change="onFileChange" required />
      <br /><br />
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
    },
    async submitForm() {
      if (!this.selectedFile) {
        alert('Please select an image to upload.');
        return;
      }

      const formData = new FormData();
      formData.append('image', this.selectedFile);

      try {
        const response = await fetch('https://koh-samui.com:53005/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Image uploaded and saved.');
        } else {
          alert('Error uploading the image.');
        }
      } catch (error) {
        console.error('Error uploading the image:', error);
        alert('Error uploading the image.');
      }
    },
  },
};
</script>
