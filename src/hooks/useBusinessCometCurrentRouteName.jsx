// __d(
//   "useBusinessCometCurrentRouteName",
//   [
//     "BizInboxSurface",
//     "BizInboxSurfaceUtils",
//     "BizKitConstants",
//     "unrecoverableViolation",
//     "useCometRouteTracePolicy",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     function a() {
//       var a = c("useCometRouteTracePolicy")(),
//         b = d("BizInboxSurfaceUtils").useBizInboxSurface();
//       if (b === c("BizInboxSurface").PAGE) return "INBOX";
//       switch (a) {
//         case "bizkit.home":
//         case "business.comet.home":
//         case "bizkit.home.bizfeed":
//         case "business.comet.bizsuite.page_unavailable":
//           return "HOME";
//         case "bizkit.composer":
//           return "COMPOSER";
//         case "bizkit.story_composer":
//           return "STORY_COMPOSER";
//         case "bizkit.overview":
//         case "bizkit.attribution":
//         case "bizkit.content":
//         case "bizkit.content_summary":
//         case "bizkit.lifetime":
//         case "bizkit.people":
//         case "bizkit.plan":
//         case "bizkit.results":
//         case "bizkit.retention":
//         case "bizkit.retention_benchmark":
//         case "bizkit.revenue":
//         case "bizkit.users":
//         case "bizkit.users_benchmark":
//         case "bizkit.ab_tests":
//         case "bizkit.social_activity":
//         case "bizkit.roas":
//         case "bizkit.inbox_survey":
//         case "bizkit.video":
//         case "bizkit.video_audience":
//         case "bizkit.video_benchmarking":
//         case "bizkit.video_earnings":
//         case "bizkit.video_earnings_instream_ads":
//         case "bizkit.video_earnings_stars":
//         case "bizkit.video_loyalty":
//         case "bizkit.video_retention":
//         case "bizkit.video_summary":
//         case "bizkit.benchmark":
//         case "bizkit.music_consumption":
//         case "bizkit.music_for_reels":
//         case "bizkit.music_production":
//         case "bizkit.music_search":
//         case "bizkit.music_trends":
//         case "bizkit.messaging":
//         case "bizkit.leads_center_insights":
//         case "bizkit.subscriptions_earnings":
//         case "bizkit.avatars_store_earnings":
//           return "INSIGHTS";
//         case "bizkit.all":
//         case "bizkit.automated_responses":
//         case "bizkit.commerce_email":
//         case "bizkit.contacts":
//         case "bizkit.facebook":
//         case "bizkit.instagram_direct":
//         case "bizkit.instagram":
//         case "bizkit.lead_email":
//         case "bizkit.messenger":
//         case "bizkit.offsite_email":
//         case "bizkit.wec":
//         case "bizkit.all.compat":
//         case "bizkit.automated_responses.compat":
//         case "bizkit.commerce_email.compat":
//         case "bizkit.contacts.compat":
//         case "bizkit.facebook.compat":
//         case "bizkit.instagram_direct.compat":
//         case "bizkit.instagram.compat":
//         case "bizkit.lead_email.compat":
//         case "bizkit.messenger.compat":
//         case "bizkit.offsite_email.compat":
//         case "bizkit.wec.compat":
//         case "business.comet.inbox.root":
//         case "bizkit.channels":
//           return "INBOX";
//         case "bizkit.chat_theme":
//         case "bizkit.messaging_ai":
//         case "bizkit.lead_forms":
//         case "bizkit.calls":
//           return "INBOX_SETTINGS";
//         case "bizkit.page_roles":
//         case "bizkit.business_info":
//         case "bizkit.business_users":
//         case "bizkit.business_assets":
//         case "bizkit.business_partners":
//         case "bizkit.business_requests":
//         case "bizkit.payment_methods":
//         case "bizkit.domains":
//         case "bizkit.block_lists":
//         case "bizkit.security_center":
//         case "bizkit.notifications":
//         case "bizkit.notifications_v2":
//         case "bizkit.news_pages":
//         case "bizkit.mv4b":
//         case "bizkit.mv4b_non_business":
//         case "bizkit.business_asset_groups":
//         case "bizkit.commerce_accounts":
//         case "bizkit.apps":
//         case "bizkit.system_users":
//         case "bizkit.partners":
//         case "bizkit.product_catalogs":
//         case "bizkit.pixels":
//         case "bizkit.offline_event_sets":
//         case "bizkit.events_dataset":
//         case "bizkit.custom_conversions":
//         case "bizkit.business_creative_folders":
//         case "bizkit.ad_accounts":
//         case "bizkit.pages":
//         case "bizkit.shared_audiences":
//         case "bizkit.leads_access":
//         case "bizkit.business_info_v2":
//         case "bizkit.business_info_v3":
//         case "bizkit.whatsapp_account":
//         case "bizkit.instagram_account":
//         case "bizkit.connected_apps":
//         case "bizkit.setup_guide":
//         case "bizkit.bm_requests":
//         case "bizkit.setup_guide_v2":
//         case "bizkit.ad_review_tool":
//         case "bizkit.content_allow_lists":
//         case "bizkit.ad_status":
//         case "bizkit.advertiser_approval_tool":
//         case "bizkit.advanced_analytics":
//         case "bizkit.authorizations_verifications":
//         case "bizkit.publisher_allow_lists":
//         case "bizkit.properties":
//         case "bizkit.registered_trademarks":
//         case "bizkit.app_integrations":
//         case "business.comet.mixed_perms_v2":
//         case "bizkit.conversation_routing":
//         case "bizkit.china_user_profile_creation":
//           return "SETTINGS";
//         case "business.comet.adcenter":
//         case "bizkit.ad_center":
//         case "bizkit.all_ads":
//         case "bizkit.ads_summary":
//         case "bizkit.ads_targeting":
//         case "bizkit.ads_guidance":
//           return "AD_CENTER";
//         case "bizkit.ads_creation":
//           return "ADS_CREATION";
//         case "bizkit.ads_drafts":
//           return "ADS_DRAFTS";
//         case "bizkit.boost_ab_test_creation":
//           return "BOOST_AB_TEST_CREATION";
//         case "bizkit.automated_ads_creation":
//           return "AUTOMATED_ADS_CREATION";
//         case "bizkit.boosted_ab_test_item_picker":
//           return "BOOSTED_AB_TEST_ITEM_PICKER";
//         case "bizkit.boosted_item_picker":
//           return "BOOSTED_ITEM_PICKER";
//         case "bizkit.boost_automotive_inventory_creation":
//           return "BOOST_AUTOMOTIVE_INVENTORY_CREATION";
//         case "bizkit.boost_catalog_sales_creation":
//           return "BOOST_CATALOG_SALES_CREATION";
//         case "bizkit.boost_cta_creation":
//           return "BOOST_CTA_CREATION";
//         case "bizkit.boost_event_creation":
//           return "BOOST_EVENT_CREATION";
//         case "bizkit.boost_instagram_media_creation":
//           return "BOOST_INSTAGRAM_MEDIA_CREATION";
//         case "bizkit.boost_integrated_business_creation":
//           return "BOOST_INTEGRATED_BUSINESS_CREATION";
//         case "bizkit.boost_lead_gen_creation":
//           return "BOOST_LEAD_GEN_CREATION";
//         case "bizkit.boost_local_awareness_creation":
//           return "BOOST_LOCAL_AWARENESS_CREATION";
//         case "bizkit.boost_pagelike_creation":
//           return "BOOST_PAGELIKE_CREATION";
//         case "bizkit.boost_post_creation":
//           return "BOOST_POST_CREATION";
//         case "bizkit.boost_purchase_creation":
//           return "BOOST_PURCHASE_CREATION";
//         case "bizkit.boost_website_creation":
//           return "BOOST_WEBSITE_CREATION";
//         case "bizkit.consolidated_product_creation":
//           return "CONSOLIDATED_PRODUCT_CREATION";
//         case "bizkit.consolidatedad":
//           return "CONSOLIDATEDAD";
//         case "bizkit.published_posts":
//         case "bizkit.scheduled_posts":
//         case "bizkit.draft_posts":
//         case "bizkit.ready_made_reels":
//         case "bizkit.needs_review_posts":
//         case "bizkit.ads_posts":
//         case "bizkit.expiring_posts":
//         case "bizkit.expired_posts":
//         case "bizkit.active_stories":
//         case "bizkit.scheduled_stories":
//         case "bizkit.archive_stories":
//         case "bizkit.published_posts.compat":
//         case "bizkit.scheduled_posts.compat":
//         case "bizkit.draft_posts.compat":
//         case "bizkit.scheduled_stories.compat":
//         case "bizkit.active_stories.compat":
//         case "bizkit.archive_stories.compat":
//         case "bizkit.feed_and_grid.compat":
//         case "bizkit.feed_and_grid":
//         case "bizkit.photos.compat":
//         case "bizkit.photos":
//         case "bizkit.ab_testing.compat":
//         case "bizkit.tagged_content.compat":
//         case "bizkit.tagged_content":
//         case "bizkit.playlist":
//         case "bizkit.playlist_details":
//         case "bizkit.all_videolists":
//         case "bizkit.series":
//         case "bizkit.all_series":
//         case "bizkit.series_details":
//         case "bizkit.season_details":
//         case "business.comet.posts.published_threads":
//           return "POSTS";
//         case "bizkit.fbmchannels":
//           return "FBM_CHANNELS";
//         case "business.comet.bizsuite.content_calendar":
//           return "CONTENT_CALENDAR";
//         case "bizkit.creative_assets":
//           return "CREATIVE_ASSETS";
//         case "bizkit.business_apps":
//         case "bizkit.discover":
//         case "bizkit.discover.compat":
//         case "bizkit.manage_external_business_connection":
//         case "bizkit.manage_external_business_connection.compat":
//         case "bizkit.app.compat":
//         case "bizkit.app":
//           return "BUSINESS_APP_STORE";
//         case "business.comet.bizsuite.payments":
//         case "business.comet.bizsuite.payments_overview":
//         case "business.comet.bizsuite.payments_transactions":
//         case "business.comet.bizsuite.payments_earnings":
//         case "business.comet.bizsuite.payments_payouts":
//         case "business.comet.bizsuite.payments_support":
//         case "business.comet.bizsuite.payments_settings":
//           return "PAYMENTS";
//         case "bizkit.business_feed":
//         case "bizkit.business_feed_following":
//         case "bizkit.business_feed_all":
//         case "bizkit.business_feed_similar":
//         case "bizkit.business_feed_popular":
//         case "bizkit.business_feed_local":
//         case "bizkit.business_feed_instagram_following":
//           return "BUSINESS_FEED";
//         case "bizkit.services_menu":
//           return "SERVICES_MENU";
//         case "bizkit.self_view":
//           return "SELF_VIEW";
//         case "business.comet.bizkit.inventory_view.root":
//           return "INVENTORY";
//         case "bizkit.appointments_list":
//         case "bizkit.appointments_settings":
//         case "bizkit.appointments_calendar":
//           return "APPOINTMENTS";
//         case "bizkit.get_started":
//           return "GET_STARTED";
//         case "bizkit.paid_partnerships":
//         case "bizkit.paid_partnerships.onboarding":
//         case "bizkit.paid_partnerships.campaigns.invite_creators.invite_creators_invite":
//         case "bizkit.paid_partnerships.campaigns.invite_creators.invite_creators_list":
//         case "bizkit.paid_partnerships.campaigns.campaigns_list":
//         case "bizkit.paid_partnerships.campaigns.campaign_flow":
//         case "bizkit.paid_partnerships.campaigns.campaign":
//         case "bizkit.paid_partnerships.campaigns.campaign.projects":
//         case "bizkit.paid_partnerships.campaigns.campaign_v2.unconfirmed_creators":
//         case "bizkit.paid_partnerships.campaigns.campaign_v2.interested_creators":
//         case "bizkit.paid_partnerships.campaigns.campaign_v2.confirmed_creators":
//         case "bizkit.paid_partnerships.campaigns.campaign_v2.campaign_content_v2":
//         case "bizkit.paid_partnerships.campaigns.campaign_v2.selected_content":
//         case "bizkit.paid_partnerships.insights.content_insights":
//         case "bizkit.paid_partnerships.insights.all_branded_content_insights":
//         case "bizkit.paid_partnerships.insights.campaign_insights":
//         case "bizkit.paid_partnerships.insights.insights_overview":
//         case "bizkit.paid_partnerships.creators":
//         case "bizkit.paid_partnerships.creators.search":
//         case "bizkit.paid_partnerships.creators.recommendations":
//         case "bizkit.paid_partnerships.creators.lists":
//         case "bizkit.paid_partnerships.creators.tags_and_follows":
//         case "bizkit.paid_partnerships.creators.interested_creators":
//         case "bizkit.paid_partnerships.creators.previous_partnerships":
//         case "bizkit.paid_partnerships.creators.tags":
//         case "bizkit.paid_partnerships.creators.follows":
//         case "bizkit.paid_partnerships.pp_settings":
//         case "bizkit.paid_partnerships.creator_content.product_recognition":
//         case "bizkit.paid_partnerships.content_discovery.tags_and_mentions":
//         case "bizkit.paid_partnerships.content_discovery.saved_posts":
//         case "bizkit.paid_partnerships.content_discovery.boost_requests":
//         case "bizkit.paid_partnerships.content_discovery.boost_requests.permission_form":
//         case "bizkit.paid_partnerships.agency_permissions":
//         case "bizkit.paid_partnerships.marketing_partners":
//           return "CREATOR_MARKETPLACE";
//         case "business.comet.bizsuite.marketing_messages":
//         case "bizkit.automated_campaigns":
//         case "bizkit.one_time_campaigns":
//         case "bizkit.mm_overview":
//         case "bizkit.mm_campaign_list":
//         case "bizkit.subscriber_growth":
//           return "MARKETING_MESSAGES";
//         case "bizkit.leads_center":
//           return "LEADS_CENTER";
//         case "bizkit.crm_destination.contacts":
//         case "bizkit.segments":
//         case "bizkit.crm_destination.contacts.compat":
//         case "bizkit.crm_destination.segments.compat":
//           return "CUSTOMER";
//         case "bizkit.marketing_message_optin_surface":
//         case "bizkit.customize_request":
//         case "bizkit.initiate_request":
//         case "bizkit.automate_request":
//           return "MARKETING_MESSAGE_OPTIN_SURFACE";
//         case "bizkit.marketing_message_composer":
//           return "MARKETING_MESSAGE_COMPOSER";
//         case "bizkit.marketing_message_get_started":
//           return "MARKETING_MESSAGE_GET_STARTED";
//         case "bizkit.marketing_message_onboarding":
//           return "MARKETING_MESSAGE_ONBOARDING";
//         case "bizkit.orders.orders_list.compat":
//         case "bizkit.orders.payouts.compat":
//         case "bizkit.orders_list":
//         case "bizkit.payment_reports":
//         case "bizkit.payment_settings":
//         case "bizkit.payouts":
//         case "bizkit.orders.payment_reports.compat":
//         case "bizkit.orders.payment_settings.compat":
//         case "bizkit.orders.bank_slips":
//           return "ORDERS";
//         case "bizkit.reels_composer":
//           return "REELS_COMPOSER";
//         case "bizkit.monetization_home_main":
//         case "bizkit.monetization_home_education":
//         case "bizkit.monetization_reels_ads":
//         case "bizkit.monetization_unified_program.monetization_unified_program_main":
//         case "bizkit.monetization_unified_program.monetization_unified_program_settings":
//         case "bizkit.monetization_ad_breaks":
//         case "bizkit.monetization_ad_breaks_main":
//         case "bizkit.monetization_ad_breaks_settings":
//         case "bizkit.monetization_creator_incentives":
//         case "bizkit.monetization_creator_incentives_main":
//         case "bizkit.monetization_creator_incentives_deal_details":
//         case "bizkit.monetization_subs_overview":
//         case "bizkit.monetization_subs_settings":
//         case "bizkit.monetization_subs_email":
//         case "bizkit.monetization_stars_main":
//         case "bizkit.monetization_stars_goals":
//         case "bizkit.monetization_stars_settings":
//         case "bizkit.policy_issues_main":
//           return "MONETIZATION";
//         case "bizkit.ads_experiments":
//         case "bizkit.ads_experiments_results":
//           return "ADS_EXPERIMENTS";
//         case "bizkit.published_forms":
//         case "bizkit.draft_forms":
//         case "bizkit.crm_setup":
//           return "INSTANT_FORMS";
//         case "bizkit.reels_composer.root":
//           return "REELS_COMPOSER";
//         case "bizkit.bulk_edit_composer":
//           return "BULK_EDIT_COMPOSER";
//         case "bizkit.bulk_upload_composer":
//           return "BULK_UPLOAD_COMPOSER";
//         case "bizkit.reels_bulk_upload_composer":
//           return "REELS_BULK_UPLOAD_COMPOSER";
//         case "bizkit.inspiration_hub":
//         case "bizkit.trending":
//         case "bizkit.foryou":
//           return "INSPIRATION_HUB";
//         case "business.comet.bizsuite.whatsapp_campaign_composer":
//           return "WHATSAPP_CAMPAIGN_COMPOSER";
//         case "business.comet.bizsuite.automations_composer":
//           return "AUTOMATIONS_COMPOSER";
//         case "bizkit.mix_breakdown_subpage":
//           return "MIX_BREAKDOWN_SUBPAGE";
//         case "bizkit.mix_artist":
//           return "MIX_ARTIST";
//         case "bizkit.mix_track":
//           return "MIX_TRACK";
//         case "bizkit.aft_agency_management_tool":
//         case "bizkit.amt_earnings":
//         case "bizkit.amt_handshakes":
//         case "bizkit.amt_overview":
//         case "bizkit.amt_support":
//           return "AFT_AGENCY_MANAGEMENT_TOOL";
//         case "bizkit.aft.overview":
//         case "bizkit.aft.handshakes":
//         case "bizkit.aft.rights_manager":
//         case "bizkit.aft.insights":
//         case "bizkit.aft.support":
//           return "CREATOR_MANAGEMENT_TOOL";
//         case "bizkit.dashboard":
//         case "bizkit.resource_hub":
//         case "bizkit.chat_tools":
//         case "bizkit.moderation":
//           return "STREAMER_HOME";
//         case "bizkit.rights_manager":
//         case "bizkit.rights_manager_overview":
//         case "bizkit.rights_manager_matches":
//         case "bizkit.rights_manager_action_items":
//         case "bizkit.rights_manager_match_rules":
//         case "bizkit.rights_manager_assets":
//         case "bizkit.rights_manager_manual_claim":
//         case "bizkit.rights_manager_preferences":
//         case "bizkit.rights_manager_takedown_requests":
//         case "bizkit.audio_releases":
//         case "bizkit.audio_releases.sound_recording":
//         case "bizkit.audio_releases.music_video":
//         case "bizkit.audio_releases.track":
//           return "RIGHTS_MANAGER";
//         case "bizkit.licensed_music":
//           return "LICENSED_MUSIC";
//         case "bizkit.education_hub":
//           return "EDUCATION_HUB";
//         case "bizkit.consumer_trends":
//         case "bizkit.consumer_trends_topic":
//           return "CONSUMER_TRENDS";
//         case "bizkit.business_home":
//           return "BUSINESS_HOME";
//         case "bizkit.boost_call_now_creation":
//           return "BOOST_CALL_NOW";
//         case "bizkit.brand_rights_protection":
//         case "bizkit.brand_rights_protection_matches":
//         case "bizkit.brand_rights_protection_search":
//         case "bizkit.brand_rights_protection_requests":
//         case "bizkit.brand_rights_protection_reports":
//         case "bizkit.brand_rights_protection_insights":
//         case "bizkit.brand_rights_protection_library":
//         case "bizkit.brand_rights_protection_allowlist":
//         case "bizkit.brand_rights_protection_settings":
//         case "bizkit.brand_rights_protection_onboarding":
//           return "BRAND_RIGHTS_PROTECTION";
//         case "bizkit.boost_story_creation":
//           return "BOOST_STORY_CREATION";
//         case "bizkit.creative_ideas":
//           return "CREATIVE_IDEAS";
//         case "bizkit.business_locations":
//         case "bizkit.business_locations.stores":
//         case "bizkit.business_locations.store_sets":
//         case "bizkit.business_locations.data_sources":
//         case "bizkit.business_locations.store_locations_sharing":
//           return "BUSINESS_LOCATIONS";
//         case "bizkit.whatsapp_manager":
//         case "bizkit.whatsapp_manager.whatsapp_manager_overview":
//         case "bizkit.whatsapp_manager.message_templates":
//         case "bizkit.whatsapp_manager.template_library":
//         case "bizkit.whatsapp_manager.partner_home":
//         case "bizkit.whatsapp_manager.partner_solutions":
//         case "bizkit.whatsapp_manager.whatsapp_manager_insights":
//         case "bizkit.whatsapp_manager.flows":
//         case "bizkit.whatsapp_manager.phone_numbers":
//         case "bizkit.whatsapp_manager.catalog":
//         case "bizkit.whatsapp_manager.activity_log":
//         case "bizkit.whatsapp_manager.india":
//         case "bizkit.whatsapp_manager.singapore":
//           return "WHATSAPP_MANAGER";
//         case "bizkit.collaboration_center":
//         case "bizkit.collaboration_center.brand":
//         case "bizkit.collaboration_center.merchant":
//         case "bizkit.collaboration_center.brand.discover":
//         case "bizkit.collaboration_center.brand.partners":
//         case "bizkit.collaboration_center.brand.resources":
//           return "COLLABORATION_CENTER";
//         case "bizkit.traffic_analysis":
//           return "TRAFFIC_ANALYSIS";
//         case "bizkit.ad_limits":
//           return "AD_LIMITS";
//         case "bizkit.sound.collection":
//           return "SOUND_COLLECTION_MBS";
//         case "bizkit.unified_composer.root":
//           return "UNIFIED_VOD_AND_REELS_COMPOSER";
//         case "bizkit.business_call":
//           return "BUSINESS_CALL";
//         case "bizkit.billing_hub":
//           return "BILLING_HUB";
//         case "bizkit.account_quality":
//           return "ACCOUNT_QUALITY";
//         case "bizkit.experiments":
//           return "EXPERIMENTS";
//         case "bizkit.collabsmanager":
//           return "COLLABSMANAGER";
//         case "bizkit.campaign_planner":
//           return "CAMPAIGN_PLANNER";
//         case "bizkit.creative_hub":
//           return "CREATIVE_HUB";
//         case "bizkit.mm_lwi":
//           return "MM_LWI";
//         case "bizkit.mm_lwi_composer":
//           return "MM_LWI_COMPOSER";
//         default:
//           throw c("unrecoverableViolation")(
//             "unmatched tracePolicy, " + a,
//             d("BizKitConstants").BIZKIT_PROJECT_NAME
//           );
//       }
//     }
//     g["default"] = a;
//   },
//   98
// ); /*FB_PKG_DELIM*/

import BizInboxSurface from "BizInboxSurface";
import { useBizInboxSurface } from "BizInboxSurfaceUtils";
import { BIZKIT_PROJECT_NAME } from "BizKitConstants";
import unrecoverableViolation from "unrecoverableViolation";
import useCometRouteTracePolicy from "useCometRouteTracePolicy";

function useBusinessCometCurrentRouteName(): string {
  const routeTracePolicy = useCometRouteTracePolicy();
  const bizInboxSurface = useBizInboxSurface();

  if (bizInboxSurface === BizInboxSurface.PAGE) return "INBOX";

  switch (routeTracePolicy) {
    case "bizkit.home":
    case "business.comet.home":
    case "bizkit.home.bizfeed":
    case "business.comet.bizsuite.page_unavailable":
      return "HOME";
    case "bizkit.composer":
      return "COMPOSER";
    case "bizkit.story_composer":
      return "STORY_COMPOSER";
    case "bizkit.overview":
    case "bizkit.attribution":
    case "bizkit.content":
    case "bizkit.content_summary":
    case "bizkit.lifetime":
    case "bizkit.people":
    case "bizkit.plan":
    case "bizkit.results":
    case "bizkit.retention":
    case "bizkit.retention_benchmark":
    case "bizkit.revenue":
    case "bizkit.users":
    case "bizkit.users_benchmark":
    case "bizkit.ab_tests":
    case "bizkit.social_activity":
    case "bizkit.roas":
    case "bizkit.inbox_survey":
    case "bizkit.video":
    case "bizkit.video_audience":
    case "bizkit.video_benchmarking":
    case "bizkit.video_earnings":
    case "bizkit.video_earnings_instream_ads":
    case "bizkit.video_earnings_stars":
    case "bizkit.video_loyalty":
    case "bizkit.video_retention":
    case "bizkit.video_summary":
    case "bizkit.benchmark":
    case "bizkit.music_consumption":
    case "bizkit.music_for_reels":
    case "bizkit.music_production":
    case "bizkit.music_search":
    case "bizkit.music_trends":
    case "bizkit.messaging":
    case "bizkit.leads_center_insights":
    case "bizkit.subscriptions_earnings":
    case "bizkit.avatars_store_earnings":
      return "INSIGHTS";
    case "bizkit.all":
    case "bizkit.automated_responses":
    case "bizkit.commerce_email":
    case "bizkit.contacts":
    case "bizkit.facebook":
    case "bizkit.instagram_direct":
    case "bizkit.instagram":
    case "bizkit.lead_email":
    case "bizkit.messenger":
    case "bizkit.offsite_email":
    case "bizkit.wec":
    case "bizkit.all.compat":
    case "bizkit.automated_responses.compat":
    case "bizkit.commerce_email.compat":
    case "bizkit.contacts.compat":
    case "bizkit.facebook.compat":
    case "bizkit.instagram_direct.compat":
    case "bizkit.instagram.compat":
    case "bizkit.lead_email.compat":
    case "bizkit.messenger.compat":
    case "bizkit.offsite_email.compat":
    case "bizkit.wec.compat":
    case "business.comet.inbox.root":
    case "bizkit.channels":
      return "INBOX";
    case "bizkit.chat_theme":
    case "bizkit.messaging_ai":
    case "bizkit.lead_forms":
    case "bizkit.calls":
      return "INBOX_SETTINGS";
    case "bizkit.page_roles":
    case "bizkit.business_info":
    case "bizkit.business_users":
    case "bizkit.business_assets":
    case "bizkit.business_partners":
    case "bizkit.business_requests":
    case "bizkit.payment_methods":
    case "bizkit.domains":
    case "bizkit.block_lists":
    case "bizkit.security_center":
    case "bizkit.notifications":
    case "bizkit.notifications_v2":
    case "bizkit.news_pages":
    case "bizkit.mv4b":
    case "bizkit.mv4b_non_business":
    case "bizkit.business_asset_groups":
    case "bizkit.commerce_accounts":
    case "bizkit.apps":
    case "bizkit.system_users":
    case "bizkit.partners":
    case "bizkit.product_catalogs":
    case "bizkit.pixels":
    case "bizkit.offline_event_sets":
    case "bizkit.events_dataset":
    case "bizkit.custom_conversions":
    case "bizkit.business_creative_folders":
    case "bizkit.ad_accounts":
    case "bizkit.pages":
    case "bizkit.shared_audiences":
    case "bizkit.leads_access":
    case "bizkit.business_info_v2":
    case "bizkit.business_info_v3":
    case "bizkit.whatsapp_account":
    case "bizkit.instagram_account":
    case "bizkit.connected_apps":
    case "bizkit.setup_guide":
    case "bizkit.bm_requests":
    case "bizkit.setup_guide_v2":
    case "bizkit.ad_review_tool":
    case "bizkit.content_allow_lists":
    case "bizkit.ad_status":
    case "bizkit.advertiser_approval_tool":
    case "bizkit.advanced_analytics":
    case "bizkit.authorizations_verifications":
    case "bizkit.publisher_allow_lists":
    case "bizkit.properties":
    case "bizkit.registered_trademarks":
    case "bizkit.app_integrations":
    case "business.comet.mixed_perms_v2":
    case "bizkit.conversation_routing":
    case "bizkit.china_user_profile_creation":
      return "SETTINGS";
    case "business.comet.adcenter":
    case "bizkit.ad_center":
    case "bizkit.all_ads":
    case "bizkit.ads_summary":
    case "bizkit.ads_targeting":
    case "bizkit.ads_guidance":
      return "AD_CENTER";
    case "bizkit.ads_creation":
      return "ADS_CREATION";
    case "bizkit.ads_drafts":
      return "ADS_DRAFTS";
    case "bizkit.boost_ab_test_creation":
      return "BOOST_AB_TEST_CREATION";
    case "bizkit.automated_ads_creation":
      return "AUTOMATED_ADS_CREATION";
    case "bizkit.boosted_ab_test_item_picker":
      return "BOOSTED_AB_TEST_ITEM_PICKER";
    case "bizkit.boosted_item_picker":
      return "BOOSTED_ITEM_PICKER";
    case "bizkit.boost_automotive_inventory_creation":
      return "BOOST_AUTOMOTIVE_INVENTORY_CREATION";
    case "bizkit.boost_catalog_sales_creation":
      return "BOOST_CATALOG_SALES_CREATION";
    case "bizkit.boost_cta_creation":
      return "BOOST_CTA_CREATION";
    case "bizkit.boost_event_creation":
      return "BOOST_EVENT_CREATION";
    case "bizkit.boost_instagram_media_creation":
      return "BOOST_INSTAGRAM_MEDIA_CREATION";
    case "bizkit.boost_integrated_business_creation":
      return "BOOST_INTEGRATED_BUSINESS_CREATION";
    case "bizkit.boost_lead_gen_creation":
      return "BOOST_LEAD_GEN_CREATION";
    case "bizkit.boost_local_awareness_creation":
      return "BOOST_LOCAL_AWARENESS_CREATION";
    case "bizkit.boost_pagelike_creation":
      return "BOOST_PAGELIKE_CREATION";
    case "bizkit.boost_post_creation":
      return "BOOST_POST_CREATION";
    case "bizkit.boost_purchase_creation":
      return "BOOST_PURCHASE_CREATION";
    case "bizkit.boost_website_creation":
      return "BOOST_WEBSITE_CREATION";
    case "bizkit.consolidated_product_creation":
      return "CONSOLIDATED_PRODUCT_CREATION";
    case "bizkit.consolidatedad":
      return "CONSOLIDATEDAD";
    case "bizkit.published_posts":
    case "bizkit.scheduled_posts":
    case "bizkit.draft_posts":
    case "bizkit.ready_made_reels":
    case "bizkit.needs_review_posts":
    case "bizkit.ads_posts":
    case "bizkit.expiring_posts":
    case "bizkit.expired_posts":
    case "bizkit.active_stories":
    case "bizkit.scheduled_stories":
    case "bizkit.archive_stories":
    case "bizkit.published_posts.compat":
    case "bizkit.scheduled_posts.compat":
    case "bizkit.draft_posts.compat":
    case "bizkit.scheduled_stories.compat":
    case "bizkit.active_stories.compat":
    case "bizkit.archive_stories.compat":
    case "bizkit.feed_and_grid.compat":
    case "bizkit.feed_and_grid":
    case "bizkit.photos.compat":
    case "bizkit.photos":
    case "bizkit.ab_testing.compat":
    case "bizkit.tagged_content.compat":
    case "bizkit.tagged_content":
    case "bizkit.playlist":
    case "bizkit.playlist_details":
    case "bizkit.all_videolists":
    case "bizkit.series":
    case "bizkit.all_series":
    case "bizkit.series_details":
    case "bizkit.season_details":
    case "business.comet.posts.published_threads":
      return "POSTS";
    case "bizkit.fbmchannels":
      return "FBM_CHANNELS";
    case "business.comet.bizsuite.content_calendar":
      return "CONTENT_CALENDAR";
    case "bizkit.creative_assets":
      return "CREATIVE_ASSETS";
    case "bizkit.business_apps":
    case "bizkit.discover":
    case "bizkit.discover.compat":
    case "bizkit.manage_external_business_connection":
    case "bizkit.manage_external_business_connection.compat":
    case "bizkit.app.compat":
    case "bizkit.app":
      return "BUSINESS_APP_STORE";
    case "business.comet.bizsuite.payments":
    case "business.comet.bizsuite.payments_overview":
    case "business.comet.bizsuite.payments_transactions":
    case "business.comet.bizsuite.payments_earnings":
    case "business.comet.bizsuite.payments_payouts":
    case "business.comet.bizsuite.payments_support":
    case "business.comet.bizsuite.payments_settings":
      return "PAYMENTS";
    case "bizkit.business_feed":
    case "bizkit.business_feed_following":
    case "bizkit.business_feed_all":
    case "bizkit.business_feed_similar":
    case "bizkit.business_feed_popular":
    case "bizkit.business_feed_local":
    case "bizkit.business_feed_instagram_following":
      return "BUSINESS_FEED";
    case "bizkit.services_menu":
      return "SERVICES_MENU";
    case "bizkit.self_view":
      return "SELF_VIEW";
    case "business.comet.bizkit.inventory_view.root":
      return "INVENTORY";
    case "bizkit.appointments_list":
    case "bizkit.appointments_settings":
    case "bizkit.appointments_calendar":
      return "APPOINTMENTS";
    case "bizkit.get_started":
      return "GET_STARTED";
    case "bizkit.paid_partnerships":
    case "bizkit.paid_partnerships.onboarding":
    case "bizkit.paid_partnerships.campaigns.invite_creators.invite_creators_invite":
    case "bizkit.paid_partnerships.campaigns.invite_creators.invite_creators_list":
    case "bizkit.paid_partnerships.campaigns.campaigns_list":
    case "bizkit.paid_partnerships.campaigns.campaign_flow":
    case "bizkit.paid_partnerships.campaigns.campaign":
    case "bizkit.paid_partnerships.campaigns.campaign.projects":
    case "bizkit.paid_partnerships.campaigns.campaign_v2.unconfirmed_creators":
    case "bizkit.paid_partnerships.campaigns.campaign_v2.interested_creators":
    case "bizkit.paid_partnerships.campaigns.campaign_v2.confirmed_creators":
    case "bizkit.paid_partnerships.campaigns.campaign_v2.campaign_content_v2":
    case "bizkit.paid_partnerships.campaigns.campaign_v2.selected_content":
    case "bizkit.paid_partnerships.insights.content_insights":
    case "bizkit.paid_partnerships.insights.all_branded_content_insights":
    case "bizkit.paid_partnerships.insights.campaign_insights":
    case "bizkit.paid_partnerships.insights.insights_overview":
    case "bizkit.paid_partnerships.creators":
    case "bizkit.paid_partnerships.creators.search":
    case "bizkit.paid_partnerships.creators.recommendations":
    case "bizkit.paid_partnerships.creators.lists":
    case "bizkit.paid_partnerships.creators.tags_and_follows":
    case "bizkit.paid_partnerships.creators.interested_creators":
    case "bizkit.paid_partnerships.creators.previous_partnerships":
    case "bizkit.paid_partnerships.creators.tags":
    case "bizkit.paid_partnerships.creators.follows":
    case "bizkit.paid_partnerships.pp_settings":
    case "bizkit.paid_partnerships.creator_content.product_recognition":
    case "bizkit.paid_partnerships.content_discovery.tags_and_mentions":
    case "bizkit.paid_partnerships.content_discovery.saved_posts":
    case "bizkit.paid_partnerships.content_discovery.boost_requests":
    case "bizkit.paid_partnerships.content_discovery.boost_requests.permission_form":
    case "bizkit.paid_partnerships.agency_permissions":
    case "bizkit.paid_partnerships.marketing_partners":
      return "CREATOR_MARKETPLACE";
    case "business.comet.bizsuite.marketing_messages":
    case "bizkit.automated_campaigns":
    case "bizkit.one_time_campaigns":
    case "bizkit.mm_overview":
    case "bizkit.mm_campaign_list":
    case "bizkit.subscriber_growth":
      return "MARKETING_MESSAGES";
    case "bizkit.leads_center":
      return "LEADS_CENTER";
    case "bizkit.crm_destination.contacts":
    case "bizkit.segments":
    case "bizkit.crm_destination.contacts.compat":
    case "bizkit.crm_destination.segments.compat":
      return "CUSTOMER";
    case "bizkit.marketing_message_optin_surface":
    case "bizkit.customize_request":
    case "bizkit.initiate_request":
    case "bizkit.automate_request":
      return "MARKETING_MESSAGE_OPTIN_SURFACE";
    case "bizkit.marketing_message_composer":
      return "MARKETING_MESSAGE_COMPOSER";
    case "bizkit.marketing_message_get_started":
      return "MARKETING_MESSAGE_GET_STARTED";
    case "bizkit.marketing_message_onboarding":
      return "MARKETING_MESSAGE_ONBOARDING";
    case "bizkit.orders.orders_list.compat":
    case "bizkit.orders.payouts.compat":
    case "bizkit.orders_list":
    case "bizkit.payment_reports":
    case "bizkit.payment_settings":
    case "bizkit.payouts":
    case "bizkit.orders.payment_reports.compat":
    case "bizkit.orders.payment_settings.compat":
    case "bizkit.orders.bank_slips":
      return "ORDERS";
    case "bizkit.reels_composer":
      return "REELS_COMPOSER";
    case "bizkit.monetization_home_main":
    case "bizkit.monetization_home_education":
    case "bizkit.monetization_reels_ads":
    case "bizkit.monetization_unified_program.monetization_unified_program_main":
    case "bizkit.monetization_unified_program.monetization_unified_program_settings":
    case "bizkit.monetization_ad_breaks":
    case "bizkit.monetization_ad_breaks_main":
    case "bizkit.monetization_ad_breaks_settings":
    case "bizkit.monetization_creator_incentives":
    case "bizkit.monetization_creator_incentives_main":
    case "bizkit.monetization_creator_incentives_deal_details":
    case "bizkit.monetization_subs_overview":
    case "bizkit.monetization_subs_settings":
    case "bizkit.monetization_subs_email":
    case "bizkit.monetization_stars_main":
    case "bizkit.monetization_stars_goals":
    case "bizkit.monetization_stars_settings":
    case "bizkit.policy_issues_main":
      return "MONETIZATION";
    case "bizkit.ads_experiments":
    case "bizkit.ads_experiments_results":
      return "ADS_EXPERIMENTS";
    case "bizkit.published_forms":
    case "bizkit.draft_forms":
    case "bizkit.crm_setup":
      return "INSTANT_FORMS";
    case "bizkit.reels_composer.root":
      return "REELS_COMPOSER";
    case "bizkit.bulk_edit_composer":
      return "BULK_EDIT_COMPOSER";
    case "bizkit.bulk_upload_composer":
      return "BULK_UPLOAD_COMPOSER";
    case "bizkit.reels_bulk_upload_composer":
      return "REELS_BULK_UPLOAD_COMPOSER";
    case "bizkit.inspiration_hub":
    case "bizkit.trending":
    case "bizkit.foryou":
      return "INSPIRATION_HUB";
    case "business.comet.bizsuite.whatsapp_campaign_composer":
      return "WHATSAPP_CAMPAIGN_COMPOSER";
    case "business.comet.bizsuite.automations_composer":
      return "AUTOMATIONS_COMPOSER";
    case "bizkit.mix_breakdown_subpage":
      return "MIX_BREAKDOWN_SUBPAGE";
    case "bizkit.mix_artist":
      return "MIX_ARTIST";
    case "bizkit.mix_track":
      return "MIX_TRACK";
    case "bizkit.aft_agency_management_tool":
    case "bizkit.amt_earnings":
    case "bizkit.amt_handshakes":
    case "bizkit.amt_overview":
    case "bizkit.amt_support":
      return "AFT_AGENCY_MANAGEMENT_TOOL";
    case "bizkit.aft.overview":
    case "bizkit.aft.handshakes":
    case "bizkit.aft.rights_manager":
    case "bizkit.aft.insights":
    case "bizkit.aft.support":
      return "CREATOR_MANAGEMENT_TOOL";
    case "bizkit.dashboard":
    case "bizkit.resource_hub":
    case "bizkit.chat_tools":
    case "bizkit.moderation":
      return "STREAMER_HOME";
    case "bizkit.rights_manager":
    case "bizkit.rights_manager_overview":
    case "bizkit.rights_manager_matches":
    case "bizkit.rights_manager_action_items":
    case "bizkit.rights_manager_match_rules":
    case "bizkit.rights_manager_assets":
    case "bizkit.rights_manager_manual_claim":
    case "bizkit.rights_manager_preferences":
    case "bizkit.rights_manager_takedown_requests":
    case "bizkit.audio_releases":
    case "bizkit.audio_releases.sound_recording":
    case "bizkit.audio_releases.music_video":
    case "bizkit.audio_releases.track":
      return "RIGHTS_MANAGER";
    case "bizkit.licensed_music":
      return "LICENSED_MUSIC";
    case "bizkit.education_hub":
      return "EDUCATION_HUB";
    case "bizkit.consumer_trends":
    case "bizkit.consumer_trends_topic":
      return "CONSUMER_TRENDS";
    case "bizkit.business_home":
      return "BUSINESS_HOME";
    case "bizkit.boost_call_now_creation":
      return "BOOST_CALL_NOW";
    case "bizkit.brand_rights_protection":
    case "bizkit.brand_rights_protection_matches":
    case "bizkit.brand_rights_protection_search":
    case "bizkit.brand_rights_protection_requests":
    case "bizkit.brand_rights_protection_reports":
    case "bizkit.brand_rights_protection_insights":
    case "bizkit.brand_rights_protection_library":
    case "bizkit.brand_rights_protection_settings":
    case "bizkit.brand_rights_protection_onboarding":
      return "BRAND_RIGHTS_PROTECTION";
    case "bizkit.boost_story_creation":
      return "BOOST_STORY_CREATION";
    case "bizkit.creative_ideas":
      return "CREATIVE_IDEAS";
    case "bizkit.business_locations":
    case "bizkit.business_locations.stores":
    case "bizkit.business_locations.store_sets":
    case "bizkit.business_locations.data_sources":
    case "bizkit.business_locations.store_locations_sharing":
      return "BUSINESS_LOCATIONS";
    case "bizkit.whatsapp_manager":
    case "bizkit.whatsapp_manager.whatsapp_manager_overview":
    case "bizkit.whatsapp_manager.message_templates":
    case "bizkit.whatsapp_manager.template_library":
    case "bizkit.whatsapp_manager.partner_home":
    case "bizkit.whatsapp_manager.partner_solutions":
    case "bizkit.whatsapp_manager.whatsapp_manager_insights":
    case "bizkit.whatsapp_manager.flows":
    case "bizkit.whatsapp_manager.phone_numbers":
    case "bizkit.whatsapp_manager.catalog":
    case "bizkit.whatsapp_manager.activity_log":
    case "bizkit.whatsapp_manager.india":
    case "bizkit.whatsapp_manager.singapore":
      return "WHATSAPP_MANAGER";
    case "bizkit.collaboration_center":
    case "bizkit.collaboration_center.brand":
    case "bizkit.collaboration_center.merchant":
    case "bizkit.collaboration_center.brand.discover":
    case "bizkit.collaboration_center.brand.partners":
    case "bizkit.collaboration_center.brand.resources":
      return "COLLABORATION_CENTER";
    case "bizkit.traffic_analysis":
      return "TRAFFIC_ANALYSIS";
    case "bizkit.ad_limits":
      return "AD_LIMITS";
    case "bizkit.sound.collection":
      return "SOUND_COLLECTION_MBS";
    case "bizkit.unified_composer.root":
      return "UNIFIED_VOD_AND_REELS_COMPOSER";
    case "bizkit.business_call":
      return "BUSINESS_CALL";
    case "bizkit.billing_hub":
      return "BILLING_HUB";
    case "bizkit.account_quality":
      return "ACCOUNT_QUALITY";
    case "bizkit.experiments":
      return "EXPERIMENTS";
    case "bizkit.collabsmanager":
      return "COLLABSMANAGER";
    case "bizkit.campaign_planner":
      return "CAMPAIGN_PLANNER";
    case "bizkit.creative_hub":
      return "CREATIVE_HUB";
    case "bizkit.mm_lwi":
      return "MM_LWI";
    case "bizkit.mm_lwi_composer":
      return "MM_LWI_COMPOSER";
    default:
      throw unrecoverableViolation(
        `unmatched tracePolicy, ${routeTracePolicy}`,
        BIZKIT_PROJECT_NAME
      );
  }
}

export default useBusinessCometCurrentRouteName;
