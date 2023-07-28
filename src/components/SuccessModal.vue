<template>
    <div id="modal">
        <i class="el-icon-circle-check"></i>
        <h3>{{ process }} Successfully</h3>
    </div>
</template>

<script>
export default {
    props: ['process'],
}
</script>

<style scoped>
#modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    height: 200px;
    text-align: center;
    background: #fff;
    box-shadow: 2px 2px 5px rgb(0, 0, 0, 0.3);
    border-radius: 6px;
    padding: 25px;
    position: absolute;
    left: 50%;
   top: 50%; 
   margin-left: -150px;
   margin-top: -150px;
   z-index: 5;
    
}

i {
    font-size: 50px;
}


</style>