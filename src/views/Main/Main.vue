<template>
  <div>
    <div id="global-uploader">
        我是首页
        <!-- <input type="file" name="uploadFile" id="uploadFile" @change="changeUploadFile" mo> -->
        <!-- <el-button @click="changeUploadFile">上传</el-button> -->
        <!-- 上传 -->
        <!-- <uploader
                ref="uploader"
                :options="options"
                :autoStart="false"
                @file-added="onFileAdded"
                @file-success="onFileSuccess"
                @file-progress="onFileProgress"
                @file-error="onFileError"
                class="uploader-app">
            <uploader-unsupport></uploader-unsupport>
            <uploader-btn id="global-uploader-btn" :attrs="attrs" ref="uploadBtn">选择文件</uploader-btn>
            <uploader-list v-show="panelShow">
                <div class="file-panel" slot-scope="props" :class="{'collapse': collapse}">
                    <div class="file-title">
                        <h2>文件列表</h2>
                        <div class="operate">
                            <el-button @click="fileListShow" type="text" :title="collapse ? '展开':'折叠' ">
                                <i class="iconfont" :class="collapse ? 'icon-fullscreen': 'icon-minus-round'"></i>
                            </el-button>
                            <el-button @click="close" type="text" title="关闭">
                                <i class="iconfont icon-close"></i>
                            </el-button>
                        </div>
                    </div>
                    <ul class="file-list">
                        <li v-for="file in props.fileList" :key="file.id">
                            <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
                        </li>
                        <div class="no-file" v-if="!props.fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div>
                    </ul>
                </div>
            </uploader-list>
        </uploader> -->
    </div>
  </div>
</template>

<script>
/**
@description:首页
@createTime:2020-05-26
@create:lijiahui
*/
import { ACCEPT_CONFIG } from 'utils/validate';
export default {
  name: 'Main',
  props: {},
  components: {},
  data() {
    return {
      options: {
            target: 'http://xxxxx/xx',
            chunkSize: '2048000',
            fileParameterName: 'file',
            maxChunkRetries: 3,
            testChunks: true,
            checkChunkUploadedByResponse: function (chunk, message) {
                let objMessage = JSON.parse(message);
                if (objMessage.skipUpload) {
                    return true;
                }
                return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
            }
        },
        attrs: {
            accept: ACCEPT_CONFIG.getAll()
        },
        panelShow: false
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    changeUploadFile () {
      document.querySelector('#global-uploader-btn').click();
      console.log(document.querySelector('#global-uploader-btn'));
    },
    onFileAdded(file) {
        this.panelShow = true;
        console.log(file);
    },
    onFileProgress(rootFile, file, chunk) {
        console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`);
    },
    onFileSuccess(rootFile, file, response, chunk) {
        console.log(`${rootFile}----${file}---${response}--${chunk}`);
    },
    onFileError(rootFile, file, response, chunk) {
        console.log(`${rootFile}----${file}---${response}--${chunk}`);
    }
  }
};
</script>
<style scoped lang="sass">

</style>
