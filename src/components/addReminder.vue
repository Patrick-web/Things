<template>
  <div class="saveStickyConntainer">
      <p class="containerTitle">Add Sticky Note</p>
      <div class="inputsContainer">
          <div class="inputArea">
              <label for="title">Title</label>
              <input type="text">
          </div>
          <div class="inputArea">
              <label for="desc">Description</label>
              <input type="text" id="desc">
          </div>
      </div>
      <div class="pickerContainer">
          <button id="time">Time</button>
          <button id="date">Date</button>
      </div>
      <div id="saveReminder">
          <p>Save</p>
          <img src="@/assets/save-white.svg" alt="">
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>