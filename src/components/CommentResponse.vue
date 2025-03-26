<template>
    <div class="comment-response">
        <textarea 
            v-model="response" 
            placeholder="Write your response..." 
            class="response-textarea">
        </textarea>
        <button @click="submitResponse" class="response-button">Submit</button>
    </div>
</template>

<script setup>

</script>

<style scoped>
.comment-response {
    display: flex;
    flex-direction: column;
    align-items: center;
}

textarea{
    width: 70%;
    resize: none;
    color: white;
    background: #333;
    min-width: 20vw;
    height: 80px;
    margin: 10px;
    padding: 10px;
    font-size: 1.2em;
    border: 1px solid #666;
    border-radius: 15px;
    border: none;
}

.response-button {
    align-self: flex-end;
    margin-right: 15%;
    margin-bottom: 10px;
    padding: 10px 20px;
    font-size: 14px;
    color: white;
    background: #333;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.response-button:hover {
    background-color: #555;
}
</style>