<template>
  <div class="titleArea">
    <p id="pageTitle">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style>
.titleArea {
  height: 150px;
  width: 100%;
  top: 0;
  z-index: 2;
  background: black;
  box-shadow: 2px 2px 10px rgba(61, 61, 61, 0.582);
  display: flex;
  align-items: center;
  justify-content: center;
}
.titleArea p {
  color: rgb(255, 255, 255);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  left: 10px;
  font-size: 1.5rem;
  top: 8px;
  font-weight: 900;
  width: 100%;
  text-align: center;
}
</style>
