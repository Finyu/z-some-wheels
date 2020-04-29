<template>
  <div>
    <header>
      <i class='el-icon-s-unfold' @click='drawer = !drawer'></i>
      <a class='homeLink' @click='$router.push("/index")'>
        Z-some-wheels
      </a>
      <div class='linkAndSeach' >
        Github <i class='el-icon-top-right' @click='goGithub'></i>
      </div>
    </header>
    <article>
      <div  class='leftContent'>
        <el-scrollbar style='height:100%;'>
          <navz :routerData='routerData'></navz>
        </el-scrollbar>
      </div>
      <div class='rightContent'>
        <el-scrollbar class='page-component__scroll' style='height:100%;'>
          <div class='showMainBody'>
              <router-view></router-view>
          </div>
        </el-scrollbar>
      </div>
      <div :style="{'left': !drawer ? 'calc(-120%)' : '0px'}" class='sidebarZ'>
        <div class='sidebar-left'>
          <el-scrollbar style='height:100%;'>
            <p class='gitLink' >
              Github <i class='el-icon-top-right' @click='goGithub'></i>
            </p>
            <navz :routerData='routerData'></navz>
          </el-scrollbar>
        </div>
        <div class='sidebar-right' @click='drawer = !drawer'>

        </div>
      </div>
    </article>
  </div>
</template>

<script>
import navz from '@/components/navz/navz.js'
import nav from '../router.json'
export default {
  data(){
    return  {
      routerData: nav,
      drawer: false
    }
  },
  components: {
    navz
  },
  methods: {
    goGithub(){
      window.open('https://github.com/Finyu/z-some-wheels')
    }
  }
}
</script>

<style lang='stylus'>
header
  display flex
  color #2c3e50
  font-weight 600
  justify-content space-between
  height 60px
  padding  0 20px
  line-height 60px
  border-bottom 1px #eaecef solid
  background-color white
  .el-icon-s-unfold
    display none
    line-height 60px
    font-size 28px
    cursor pointer
  .homeLink
    font black
    font-size 20px
    line-height 60px
    height 100%
    display block
    cursor pointer
  .linkAndSeach
    font #888888 
    font-size 16px
    line-height 60px
    height 100%
    display block
    cursor pointer
  @media screen and (max-width: 960px)
    .linkAndSeach
      display none
    .el-icon-s-unfold
      display block
    
article
  height calc(100vh - 60px)
  display flex
  position relative
  .leftContent
    width 320px
    height 100%
    background-color white
    border-right  1px solid #eaecef
    @media screen and (max-width: 960px)
      width 0
    .el-scrollbar__wrap
      overflow-x hidden
  .rightContent
    width calc(100vw - 320px)
    height 100%
    transition  all .5s
    @media screen and (max-width: 960px)
      width calc(100vw)
    .showMainBody
      padding 0 20px 40px
      min-height calc(100vh - 60px)
      border-left 1px #eaecef solid
      border-right 1px #eaecef solid
      max-width 800px
      margin 0 auto

    
.Z-leftTree
  padding 20px 0 20px 20px
  .Z-nav-title
    font-size 18px
    font-weight 600
    color #999
    margin 20px 0
  .Z-nav-common
    font-size 14px
    line-height 20px
    color black
    margin 15px 0px 15px 5px
    cursor pointer
    display flex
    overflow hidden
    span
      transition 0.3s
      position relative
      line-height 20px
    &:hover
      font-weight 600
  .is-route
    font-weight 600


.sidebarZ
  position absolute
  height 100%
  transition all .3s
  z-index 1
  overflow hidden
  width 100%
  display flex
  .sidebar-left
    width 240px
    background-color white
    border-right 1px solid #eaecef
    .gitLink
      margin 20px 0 0 20px
      font-weight 600
      font-size 16px
      font #888888 
      height 100%
      display block
      cursor pointer
  .sidebar-right
    width calc(100% - 240px)
</style>