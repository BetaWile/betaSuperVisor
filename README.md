# Discord SuperVisor Bot


 - [Discord SuperVisor Bot](https://github.com/beT4ww/bet4SuperVisor)
      - [Kurulum](#kurulum)
      - [İçerikler](#İçerikler)
      - [İletişim](#İletişim)
      - [FAQ](#faq)

 ## Bot Tanıtım Videosu
 - [Bot Tanıtım Videosu(Yakında)]()


# Kurulum
* İlk olarak bilgisayarına [Node JS](https://nodejs.org/en/) indir.
* Bu projeyi zip halinde indir.
* Herhangi bir klasöre zipi çıkart.
* Daha sonra `src`dosyasındaki `Settings` dosyasının içindeki `Config.json`, `Settings.json` dosyalardaki bilgileri doldur.
* Sonra klasörün içerisinde bir `powershell` ya da `cmd` penceresi aç.
* ```npm install``` yazarak tüm modülleri kur.
* Kurulum bittikten sonra ```node beta.js``` yaz ve botu başlat.


## Botun İntentlerini Açmayı Unutma!
* [Açmak İçin Tıkla](https://discord.com/developers/applications)
<img src="https://cdn.discordapp.com/attachments/818953120452575322/851116463166849054/3P4KKB.png"/>

***Tadaaa 🎉. Artık supervisor botun hazır. Dilediğin gibi kullanabilirsin.***


# Neden Yayınlandı?
 Kısaca neden böyle bir şey için uğraştığımı anlatayım. Hem kendimi geliştirmek daha iyi bilgilere ulaşmak hatalar alıp onları nasıl düzeltebileceğimi bulmak tecrübe kazanmak için hemde Türkiyede bu kadar iyi detaylı, özenli bir altyapının olmadığını fark edip bundan sizinde yaralanmanızı istedim.


## Settings.json Bilgi

```json
{
    "Token": "TOKEN",
    "GuildID": "SUNUCU_ID",
    "Prefix": ["PREFİX"],
    "BotVoice": "SES KANALI",
    "Status": "DURUM",
    "Tag": "TAG",
    "UnTag": "TAG"
}
```

## Config.json Bilgi

```json
{
    "Yetkili": {
        "AbilityYT": "TÜM_KOMUTLARA_ERİŞİM",
        "BanYT": "BAN_YETKİ",
        "jailYT": "JAİL_YETKİ",
        "muteYT": "MUTE_YETKİ",
        "vmuteYT": "VMUTE_YETKİ",
        "registerYT": "KAYIT_YETKİ"
    },
    "Roller": {
        "Jailed": "JAİL_ROL",
        "Muted": "MUTE_ROL",
        "VMuted": "VMUTE_ROL",
        "Booster": "BOOSTER_ROL",
        "VIP": "VIP_ROL"
    },
    "Register": {
        "e1": "ERKEK1_ROL",
        "e2": "ERKEK2_ROL",
        "e3": "ERKEK3_ROL",
        "k1": "KADIN1_ROL",
        "k2": "KADIN2_ROL",
        "k3": "KADIN3_ROL",
        "unreg": "KAYITSIZ_ROL",
        "süpheli": "ŞÜPHELİ_ROL",
        "TagRol": "TAG_ROL"
    },
    "Log": {
        "HosgeldinKanal": "HOŞGELDİN_KANAL",
        "Sohbet": "SOHBET_KANAL",
        "RolLog": "ROLLOG_KANAL",
        "SesLog": "SESLOG_KANAL",
        "ModLog": "MODLOG_KANAL",
        "CezaPuanLog": "CEZAPUANLOG_KANAL",
        "BanLog": "BANLOG_KANAL",
        "RegisterLog": "KAYITLOG_KANAL",
        "MuteLog": "MUTELOG_KANAL",
        "JailLog": "JAİLLOG_KANAL",
        "VMuteLog": "VMUTELOG_KANAL"
    },
    "Diger": {
        "onay": "<a:atlas_onay:852922602385047604> ŞEKLİNDE DEĞİŞTİRİN",
        "red":"<a:atlas_red:852922603010392124> ŞEKLİNDE DEĞİŞTİRİN"
    }
}
```


# İçerikler

## • Genel {
  - [x] Me
  - [x] Avatar  
  - [x] Çek 
  - [x] Git
  - [x] Snipe
  - [x] Kilit
  - [x] Rol-Al
  - [x] Rol-Ver
  - [x] Me
  - [x] Nuke
  - [x] Rol-İnfo
  - [x] Say
  - [x] Mod-Log
## };
## • Moderasyon {
  - [x] Ban
  - [x] Unban
  - [x] Jail
  - [x] Unjail
  - [x] Mute
  - [x] Unmute
  - [x] Vmute
  - [x] Unvmute
  - [x] Sicil
  - [x] Cezapuanı
  - [x] Cezapuanı-Sıfırla
## };
## • Kayıt {
  - [x] Erkek
  - [x] Kadın
  - [x] Kayıtsız
  - [x] İsim
  - [x] İsimler
  - [x] Kayıtlarım
  - [x] Top Teyit
## };
## • Stat {
  - [x] Me
  - [x] Top
  - [x] Top-Text
  - [x] Top-Voice
  - [x] Stat-Sıfırla
## };

### Teşekkürler 🧡
 - [Serandia Squad](https://discord.com/invite/serendia) ve [CodeEming Ailesine](https://discord.gg/fYm5Pj97js) hatalarımda yardım edip zaman harcadıkları için teşekkür ederim.

# İletişim
* [Discord Profilim](https://discord.com/users/852615172673503262)
* [Discord Sunucum](https://discord.gg/58UAMVJTSH)

# FAQ
Sıkça sorulan sorulara buradan ulaşabilirsin.

**Q:** Altyapıyı geliştirilmeye devam edilecek mi?<br />
**A:** Eğer bir şeyler eklersem dolaylı yoldan burayada ekleyeceğim.

**Q:** İstek herhangi bir şey ekliyor musun?<br />
**A:** Eğer istediğin şey hoşuma giderse ve yapmaktan zevk alacaksam eklerim.

**Q:** Altyapı tamamen sanamı ait?<br />
**A:** Hayır, tamamen bana ait değil sadece bağzı yapamadığım ufak bir kısmıları hazır olarak ekledim.  

**Q:** Hatalarla ilgileniyor musun?<br />
**A:** Proje içindeki hatalarla ilgileniyorum. Eğer bir hata ile karşılaşırsanız lütfen Discorddan benimle iletişim kurun. 


## NOT: Botta MIT lisansı bulunmaktadır. Bu botun dosyalarının benden habersiz paylaşılması/satılması durumunda gerekli işlemler yapılacaktır!
