<template>
  <div class="modal-box">
    <div class="relative h-72">
      <div class="flag flex flex-col w-full h-full rounded-md">
        <div class="top flex items-center justify-center h-1/2 rounded-t-md">
          <h3 class="support absolute top-5 prose-2xl"><strong>Support Ukraine!</strong></h3>
        </div>
        <div class="bottom h-1/2 rounded-b-md">
          <div class="p-4">
            <div class="flex flex-col gap-2 items-end">
              <blockquote>
                <span class="prose-base">"Life will win over death, and the light will win over darkness"</span>
              </blockquote>
              <span class="prose-sm">V.Zelensky, <br/> President of Ukraine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="prose mt-4">
      In February 2022 russia began a bloody war against Ukraine in pursuit of its imperial goals. Freedom and democratic values are alien to russia and it harms everyone who wants to prosper and live in a free democratic world!
      <br/> Every minute heroes from Armed Forces of Ukraine, thousands of volunteers, medical workers, rescuers, firefighters and thousands of men and women are fighting for freedom of Ukraine and whole Europe!
      <br/> Your donation to charities we pre-set on main page can make a difference in providing vital aid to those affected and those who need help every minute.
      <br/> Stand with us! Donate now to make a life-saving impact.
    </div>
    <button class="btn w-full mt-2" @click="$emit('close')">Close</button>
  </div>
</template>

<script>
export default {
  name: "FirstLaunch"
}
</script>

<style lang="scss" scoped>
.flag {
  > .top {
    background-color: #0056B9;
    > * {
      color: #FFD800;
    }
  }
  > .bottom {
    background-color: #FFD800;
    
    > * {
      color: #0056B9;
    }
  }
}
</style>