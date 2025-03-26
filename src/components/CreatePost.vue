<template>
    <textarea name="new-post" id="new-post" placeholder="Write post here"></textarea>
    <label for="file-upload" class="custom-file-upload">
        Upload image
    </label>
    <input id="file-upload" type="file" accept="image/*"/>
    <button @click="post">Post</button>
</template>

<script setup>
    const post = () => {

    }
</script>


<style scoped>
textarea{
    color: white;
    background: #333;
    min-width: 20vw;
    height: 100px;
    margin: 10px;
    padding: 10px;
    font-size: 1.2em;
    border-radius: 15px;
    border: none;
}

textarea::-webkit-resizer{
  display: none;
}

button{
    border: none;
    background: #333;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 10px;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
    margin-left: 10px;
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 5px;
}
</style>