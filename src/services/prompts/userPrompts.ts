/**
 * User prompts for different field types
 * These are the instructions sent to the AI for generating content
 */

type FieldType =
  | "currentFinancialSituation"
  | "employmentCircumstances"
  | "reasonForApplying";

export function getUserPrompt(
  fieldType: FieldType,
  language: "en" | "ar",
  context: string
): string {
  const prompts = {
    en: {
      currentFinancialSituation: `Please write a clear, honest, and detailed description of the current financial situation and challenges for a social support application.${context}\n\nRequirements:\n- Write 2-3 paragraphs\n- Be respectful, honest, and direct\n- Focus on factual details about financial difficulties, expenses, and challenges\n- Use only English\n- Make the content relevant to the provided context (employment, income, dependents)\n- Write in a way that helps the applicant receive the support they need`,
      employmentCircumstances: `Please write a clear, honest, and detailed description of the employment circumstances and work situation for a social support application.${context}\n\nRequirements:\n- Write 2-3 paragraphs\n- Be respectful, honest, and direct\n- Focus on factual details about work situation, job status, and employment challenges\n- Use only English\n- Make the content relevant to the provided context (employment status, income, dependents)\n- Write in a way that helps the applicant receive the support they need`,
      reasonForApplying: `Please write a clear, honest, and detailed description of the reason for applying for social support.${context}\n\nRequirements:\n- Write 2-3 paragraphs\n- Be respectful, honest, and direct\n- Focus on factual details about why support is needed\n- Use only English\n- Make the content relevant to the provided context (financial situation, employment, family circumstances)\n- Write in a way that helps the applicant receive the support they need`,
    },
    ar: {
      currentFinancialSituation: `اكتب وصفاً واضحاً وصادقاً ومفصلاً للوضع المالي الحالي والتحديات المالية التي يواجهها المتقدم لطلب دعم اجتماعي.${context}\n\nالمتطلبات:\n- اكتب فقرتين إلى ثلاث فقرات باللغة العربية الفصحى فقط\n- كن واقعياً ومحدداً: اذكر التحديات المالية الحقيقية، المصروفات، الديون، أو الصعوبات المالية\n- استخدم السياق المقدم (حالة التوظيف، الدخل الشهري، عدد المعالين) لكتابة محتوى ذي صلة\n- اكتب بأسلوب رسمي ومحترم يناسب طلب الدعم الاجتماعي\n- ركز على التفاصيل الواقعية والظروف الحقيقية\n- لا تستخدم الإنجليزية أبداً\n- اجعل المحتوى يساعد المتقدم في الحصول على الدعم الذي يحتاجه`,
      employmentCircumstances: `اكتب وصفاً واضحاً وصادقاً ومفصلاً لظروف التوظيف والوضع الوظيفي للمتقدم لطلب دعم اجتماعي.${context}\n\nالمتطلبات:\n- اكتب فقرتين إلى ثلاث فقرات باللغة العربية الفصحى فقط\n- كن واقعياً ومحدداً: اذكر الوضع الوظيفي الحالي، نوع العمل، ساعات العمل، أو التحديات في العمل\n- استخدم السياق المقدم (حالة التوظيف، الدخل الشهري، عدد المعالين) لكتابة محتوى ذي صلة\n- اكتب بأسلوب رسمي ومحترم يناسب طلب الدعم الاجتماعي\n- ركز على التفاصيل الواقعية والظروف الحقيقية\n- لا تستخدم الإنجليزية أبداً\n- اجعل المحتوى يساعد المتقدم في الحصول على الدعم الذي يحتاجه`,
      reasonForApplying: `اكتب وصفاً واضحاً وصادقاً ومفصلاً لسبب التقديم للحصول على الدعم الاجتماعي.${context}\n\nالمتطلبات:\n- اكتب فقرتين إلى ثلاث فقرات باللغة العربية الفصحى فقط\n- كن واقعياً ومحدداً: اذكر الأسباب الحقيقية والحاجة للدعم (صعوبات مالية، ظروف عائلية، ظروف صحية، إلخ)\n- استخدم السياق المقدم (الوضع المالي، حالة التوظيف، الظروف العائلية) لكتابة محتوى ذي صلة\n- اكتب بأسلوب رسمي ومحترم يناسب طلب الدعم الاجتماعي\n- ركز على التفاصيل الواقعية والظروف الحقيقية\n- لا تستخدم الإنجليزية أبداً\n- اجعل المحتوى يساعد المتقدم في الحصول على الدعم الذي يحتاجه`,
    },
  };

  return prompts[language][fieldType];
}
