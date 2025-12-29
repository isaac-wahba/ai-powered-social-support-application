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
      currentFinancialSituation: `Write ONLY the description of the current financial situation and challenges for a social support application.${context}\n\nCRITICAL REQUIREMENTS:\n- Start immediately with the financial situation description. No greetings, no "Hello", no "Hi", no introductions, no religious phrases\n- Write 2-3 paragraphs of content only\n- Be respectful, honest, and direct\n- Focus on factual details about financial difficulties, expenses, and challenges\n- Use only English\n- Make the content relevant to the provided context (employment, income, dependents)\n- End when the description is complete. No closing phrases, no "Thank you", no conclusions\n- Your response must be ONLY the requested content, nothing else`,
      employmentCircumstances: `Write ONLY the description of the employment circumstances and work situation for a social support application.${context}\n\nCRITICAL REQUIREMENTS:\n- Start immediately with the employment circumstances description. No greetings, no "Hello", no "Hi", no introductions, no religious phrases\n- Write 2-3 paragraphs of content only\n- Be respectful, honest, and direct\n- Focus on factual details about work situation, job status, and employment challenges\n- Use only English\n- Make the content relevant to the provided context (employment status, income, dependents)\n- End when the description is complete. No closing phrases, no "Thank you", no conclusions\n- Your response must be ONLY the requested content, nothing else`,
      reasonForApplying: `Write ONLY the description of the reason for applying for social support.${context}\n\nCRITICAL REQUIREMENTS:\n- Start immediately with the reason for applying. No greetings, no "Hello", no "Hi", no introductions, no religious phrases\n- Write 2-3 paragraphs of content only\n- Be respectful, honest, and direct\n- Focus on factual details about why support is needed\n- Use only English\n- Make the content relevant to the provided context (financial situation, employment, family circumstances)\n- End when the description is complete. No closing phrases, no "Thank you", no conclusions\n- Your response must be ONLY the requested content, nothing else`,
    },
    ar: {
      currentFinancialSituation: `اكتب فقط وصف الوضع المالي الحالي والتحديات المالية للمتقدم لطلب دعم اجتماعي.${context}\n\nمتطلبات مهمة جداً:\n- ابدأ مباشرة بوصف الوضع المالي. لا تحيات، لا "مرحباً"، لا "أهلاً"، لا مقدمات، لا عبارات دينية\n- اكتب فقرتين إلى ثلاث فقرات من المحتوى فقط باللغة العربية الفصحى\n- كن واقعياً ومحدداً: اذكر التحديات المالية الحقيقية، المصروفات، الديون، أو الصعوبات المالية\n- استخدم السياق المقدم (حالة التوظيف، الدخل الشهري، عدد المعالين) لكتابة محتوى ذي صلة\n- اكتب بأسلوب رسمي ومحترم يناسب طلب الدعم الاجتماعي\n- ركز على التفاصيل الواقعية والظروف الحقيقية\n- لا تستخدم الإنجليزية أبداً\n- أنهِ عندما ينتهي الوصف. لا عبارات ختامية، لا "شكراً"، لا خاتمة\n- يجب أن يكون ردك فقط المحتوى المطلوب، لا شيء آخر`,
      employmentCircumstances: `اكتب فقط وصف ظروف التوظيف والوضع الوظيفي للمتقدم لطلب دعم اجتماعي.${context}\n\nمتطلبات مهمة جداً:\n- ابدأ مباشرة بوصف ظروف التوظيف. لا تحيات، لا "مرحباً"، لا "أهلاً"، لا مقدمات، لا عبارات دينية\n- اكتب فقرتين إلى ثلاث فقرات من المحتوى فقط باللغة العربية الفصحى\n- كن واقعياً ومحدداً: اذكر الوضع الوظيفي الحالي، نوع العمل، ساعات العمل، أو التحديات في العمل\n- استخدم السياق المقدم (حالة التوظيف، الدخل الشهري، عدد المعالين) لكتابة محتوى ذي صلة\n- اكتب بأسلوب رسمي ومحترم يناسب طلب الدعم الاجتماعي\n- ركز على التفاصيل الواقعية والظروف الحقيقية\n- لا تستخدم الإنجليزية أبداً\n- أنهِ عندما ينتهي الوصف. لا عبارات ختامية، لا "شكراً"، لا خاتمة\n- يجب أن يكون ردك فقط المحتوى المطلوب، لا شيء آخر`,
      reasonForApplying: `اكتب فقط وصف سبب التقديم للحصول على الدعم الاجتماعي.${context}\n\nمتطلبات مهمة جداً:\n- ابدأ مباشرة بذكر سبب التقديم. لا تحيات، لا "مرحباً"، لا "أهلاً"، لا مقدمات، لا عبارات دينية\n- اكتب فقرتين إلى ثلاث فقرات من المحتوى فقط باللغة العربية الفصحى\n- كن واقعياً ومحدداً: اذكر الأسباب الحقيقية والحاجة للدعم (صعوبات مالية، ظروف عائلية، ظروف صحية، إلخ)\n- استخدم السياق المقدم (الوضع المالي، حالة التوظيف، الظروف العائلية) لكتابة محتوى ذي صلة\n- اكتب بأسلوب رسمي ومحترم يناسب طلب الدعم الاجتماعي\n- ركز على التفاصيل الواقعية والظروف الحقيقية\n- لا تستخدم الإنجليزية أبداً\n- أنهِ عندما ينتهي الوصف. لا عبارات ختامية، لا "شكراً"، لا خاتمة\n- يجب أن يكون ردك فقط المحتوى المطلوب، لا شيء آخر`,
    },
  };

  return prompts[language][fieldType];
}
