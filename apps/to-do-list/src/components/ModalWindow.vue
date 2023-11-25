<template>
    <div :class="$style.modal">
        <div :class="$style.modalContent">
            <button :class="$style.closeBtn" @click="closeBtnClicked">&times;</button>
            <div :class="$style.modalInnerContent">
            <slot>
            </slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ModalWindow',
    methods: {
        closeBtnClicked() {
            this.$emit('closeModal')
        }
    }
}

</script>

<style module src="./ModalWindow.css" />