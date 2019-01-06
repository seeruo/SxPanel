<template>
    <transition name="dialog-fade" @after-leave="afterLeave">
        <div class="el-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
            <div class="el-dialog" :class="[{ 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]" ref="dialog" :style="style">
                <div class="el-dialog__body" v-if="rendered">
                    <slot></slot>
                </div>
                <div class="el-dialog__footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import Popup from 'element-ui/src/utils/popup';
import Migrating from 'element-ui/src/mixins/migrating';
import emitter from 'element-ui/src/mixins/emitter';

export default {
    mixins: [Popup, emitter, Migrating],

    props: {
        title: {
            type: String,
            default: ''
        },

        modal: {
            type: Boolean,
            default: false
        },

        modalAppendToBody: {
            type: Boolean,
            default: true
        },

        appendToBody: {
            type: Boolean,
            default: false
        },

        lockScroll: {
            type: Boolean,
            default: true
        },

        closeOnClickModal: {
            type: Boolean,
            default: true
        },

        closeOnPressEscape: {
            type: Boolean,
            default: true
        },

        showClose: {
            type: Boolean,
            default: false
        },

        width: String,

        customClass: {
            type: String,
            default: ''
        },

        top: {
            type: String,
            default: '0'
        },
        beforeClose: Function,
        center: {
            type: Boolean,
            default: false
        },
        filterBox: {
            type: Object,
            default: {
                x: 0,
                y: 0,
                column: null
            }
        }
    },

    data() {
        return {
            fullscreen: false,
            closed: false,
            dialogposition: {}
        };
    },

    watch: {
        visible(val) {
            if (val) {
                this.closed = false;
                this.$emit('open');
                this.$el.addEventListener('scroll', this.updatePopper);
                this.$nextTick(() => {
                    this.$refs.dialog.scrollTop = 0;
                });
                if (this.appendToBody) {
                    document.body.appendChild(this.$el);
                }
            } else {
                this.$el.removeEventListener('scroll', this.updatePopper);
                if (!this.closed) this.$emit('close');
            }
        }
    },

    computed: {
        style() {
            let style = {};
            if (!this.fullscreen) {
                style.top = this.filterBox.y + 'px';
                style.left = this.filterBox.x + 'px';
                if (this.width) {
                    style.width = this.width;
                    style.left = (this.filterBox.x - this.width) + 'px';
                }
            }
            return style;
        }
    },

    methods: {
        getMigratingConfig() {
            return {
                props: {
                    'size': 'size is removed.'
                }
            };
        },
        handleWrapperClick() {
            if (!this.closeOnClickModal) return;
            this.handleClose();
        },
        handleClose() {
            if (typeof this.beforeClose === 'function') {
                this.beforeClose(this.hide);
            } else {
                this.hide();
            }
        },
        hide(cancel) {
            if (cancel !== false) {
                this.$emit('update:visible', false);
                this.$emit('close');
                this.closed = true;
            }
        },
        updatePopper() {
            this.broadcast('ElSelectDropdown', 'updatePopper');
            this.broadcast('ElDropdownMenu', 'updatePopper');
        },
        afterLeave() {
            this.$emit('closed');
        }
    },

    mounted() {
        if (this.visible) {
            this.rendered = true;
            this.open();
            if (this.appendToBody) {
                document.body.appendChild(this.$el);
            }
        }
    },

    destroyed() {
        if (this.appendToBody && this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
    }
};
</script>
<style scoped>
.el-dialog {
    position: absolute!important;
    min-height: 200px;
    max-height: 400px!important;
    width: 250px;
    overflow-x: none;
    overflow-y: auto;
}

.el-dialog__body {
    padding: 10px 10px;
}
</style>