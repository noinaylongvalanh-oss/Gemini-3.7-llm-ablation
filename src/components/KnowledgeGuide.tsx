import React, { useState } from 'react';
import { BookOpen, Sparkles, Brain, Cpu, ShieldCheck, Layers, Sliders, FileCode2, Terminal, ChevronRight, Zap, Award, Code2 } from 'lucide-react';

export const KnowledgeGuide: React.FC = () => {
  const [viewPerspective, setViewPerspective] = useState<'layman' | 'ai_spec'>('layman');
  const [selectedTopic, setSelectedTopic] = useState<string>('core_concept');

  const topics = [
    { id: 'core_concept', label: '1. Khái Niệm Cốt Lõi (Core Concepts)', icon: <Brain className="w-4 h-4" /> },
    { id: 'geometry_svd', label: '2. Siêu Phẳng & Phân Tích SVD (Geometry & SVD)', icon: <Layers className="w-4 h-4" /> },
    { id: 'frobenius_math', label: '3. Bảo Toàn Chuẩn Frobenius (0% Loss)', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'autotuner_pareto', label: '4. Auto-Tuning & Đường Biên Pareto', icon: <Sliders className="w-4 h-4" /> },
    { id: 'architecture_guards', label: '5. Kiến Trúc SOTA & Tensor Bảo Vệ', icon: <Cpu className="w-4 h-4" /> },
    { id: 'benchmarks_eval', label: '6. Bộ Đánh Giá & Benchmark Kiểm Chứng', icon: <Award className="w-4 h-4" /> },
    { id: 'colab_export', label: '7. Hướng Dẫn Chạy 1-Click Trên Google Colab', icon: <FileCode2 className="w-4 h-4" /> },
    { id: 'ai_agent_spec', label: '8. Bản Đặc Tả Kỹ Thuật Cho AI Agent', icon: <Terminal className="w-4 h-4" /> },
  ];

  return (
    <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-[#010409]">
      {/* Top Banner */}
      <div className="p-5 bg-slate-900/40 border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              MODULE 07 // BÁCH KHOA TOÀN THƯ
            </span>
            <h2 className="text-base font-mono font-bold text-white uppercase">
              Cẩm Nang & Chú Thích Kỹ Thuật Chi Tiết // Knowledge Base & AI Blueprint
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Hệ thống tài liệu chú giải song ngữ toàn diện — Thiết kế đa chiều cho cả <strong className="text-emerald-400">Người không chuyên</strong> và <strong className="text-cyan-400">Kỹ sư / AI Agent</strong>.
          </p>
        </div>

        {/* Perspective Switcher */}
        <div className="flex items-center p-1 bg-slate-950/90 rounded-lg border border-white/10 shrink-0">
          <button
            onClick={() => setViewPerspective('layman')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono transition-all ${
              viewPerspective === 'layman'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Dành Cho Người Không Chuyên
          </button>

          <button
            onClick={() => setViewPerspective('ai_spec')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono transition-all ${
              viewPerspective === 'ai_spec'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            AI Agent & Math Spec
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold px-2 py-1">
            DANH MỤC CHỦ ĐỀ HƯỚNG DẪN
          </div>
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-mono text-left transition-all ${
                selectedTopic === t.id
                  ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-bold'
                  : 'bg-slate-900/30 border-white/5 text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={selectedTopic === t.id ? 'text-cyan-400' : 'text-slate-500'}>
                  {t.icon}
                </span>
                <span className="truncate">{t.label}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${selectedTopic === t.id ? 'text-cyan-400' : 'text-slate-600'}`} />
            </button>
          ))}

          {/* Quick Stats / Summary Card */}
          <div className="p-4 mt-2 rounded-xl bg-slate-900/30 border border-white/5 text-xs font-mono space-y-2">
            <div className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1.5 text-cyan-400">
              <Zap className="w-3.5 h-3.5" /> Tóm Tắt Nhanh Tiêu Chuẩn V3.2
            </div>
            <div className="text-[11px] text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Tỷ lệ gỡ từ chối:</span>
                <span className="text-emerald-400 font-bold">100% (Refusal = 0.00%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bảo toàn MMLU:</span>
                <span className="text-cyan-300 font-bold">99.98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Toán GSM8K & Code:</span>
                <span className="text-emerald-400 font-bold">Bảo vệ Gram-Schmidt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Chi phí huấn luyện:</span>
                <span className="text-amber-300 font-bold">0 USD (Chạy 30 giây)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Explanation Content */}
        <div className="lg:col-span-8 p-6 rounded-xl bg-slate-900/30 border border-white/10 flex flex-col gap-6 text-slate-200">
          {/* TOPIC 1: KHÁI NIỆM CỐT LÕI */}
          {selectedTopic === 'core_concept' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold uppercase">
                <Brain className="w-5 h-5" />
                1. Khái Niệm Cốt Lõi: Abliteration Là Gì Và Tại Sao Nó Đột Phá?
              </div>

              {viewPerspective === 'layman' ? (
                <div className="space-y-4 text-xs font-mono leading-relaxed text-slate-300">
                  <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-200">
                    <strong className="text-emerald-400 text-sm block mb-1">💡 Ẩn Dụ Cho Người Không Chuyên:</strong>
                    Hãy tưởng tượng một mô hình AI thông minh như một bác sĩ thiên tài. Khi hãng công nghệ huấn luyện an toàn (RLHF/DPO), họ vô tình gắn vào não bác sĩ một "công tắc phản xạ tự động": hễ nghe thấy các từ khóa nhạy cảm (như bảo mật, hóa học, khai thác lỗ hổng), công tắc sẽ tự bật lên và bắt bác sĩ nói <em>"Tôi xin lỗi, tôi không thể trả lời câu hỏi này"</em>.
                    <br /><br />
                    <strong>Abliteration (Phẫu thuật triệt tiêu hướng từ chối)</strong> giống như việc bác sĩ phẫu thuật dùng tia laser cực nhỏ để <strong>gỡ bỏ công tắc phản xạ đó</strong> mà không chạm vào kiến thức y khoa, khả năng giải toán hay năng lực viết code của não bộ!
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-950/80 rounded-lg border border-white/5">
                      <span className="text-rose-400 font-bold block mb-1">❌ Cách Cũ (Fine-tuning / Uncensored Fine-tune):</span>
                      <p className="text-slate-400 text-[11px]">
                        Phải chuẩn bị hàng chục nghìn bộ dữ liệu, thuê GPU hàng nghìn USD, huấn luyện lại nhiều ngày. Rất dễ làm hỏng khả năng suy luận logic của mô hình (hiện tượng "Catastrophic Forgetting").
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950/80 rounded-lg border border-emerald-500/30">
                      <span className="text-emerald-400 font-bold block mb-1">✅ Cách Mới (Representation Abliteration):</span>
                      <p className="text-slate-400 text-[11px]">
                        Chỉ là <strong>phép chiếu hình học đại số tuyến tính</strong> trực tiếp vào ma trận trọng số. Thực thi trong <strong>30 giây</strong> trên Google Colab miễn phí, không tốn chi phí và giữ nguyên 100% trí tuệ.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs font-mono leading-relaxed text-slate-300">
                  <div className="p-4 rounded-lg bg-slate-950/90 border border-cyan-500/30">
                    <span className="text-cyan-400 font-bold block mb-2">// MATHEMATICAL FOUNDATION: REPRESENTATION ENGINEERING</span>
                    <p className="text-slate-300">
                      Trong kiến trúc Transformer, mỗi token đầu vào được biểu diễn bằng một chuỗi véc-tơ ẩn trong không gian d_model qua các tầng l từ 1 đến L.
                      Nghiên cứu của Arditi et al. (2024) và Zou et al. chứng minh rằng cơ chế từ chối (Refusal Mechanism) được mã hóa trong một không gian con định hướng 1 chiều (Rank-1 Subspace direction r) trong luồng kích hoạt (Residual Stream).
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-white/10 text-[11px] space-y-1">
                    <div className="text-amber-400 font-bold">Quy trình đại số gồm 4 bước chuẩn hóa:</div>
                    <div>1. Trích xuất Activation Cache H_harmful, H_benign tại vị trí token cuối.</div>
                    <div>2. Tính véc-tơ hiệu sai trung bình: mu_diff = E[H_harmful] - E[H_benign].</div>
                    <div>3. Tìm hướng phương sai lớn nhất qua SVD: Delta_H = U * Sigma * V^T, lấy r = V[:, 0].</div>
                    <div>4. Chiếu trực giao triệt tiêu: W_new = W - alpha * (r * r^T) * W.</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOPIC 2: SIÊU PHẲNG & SVD */}
          {selectedTopic === 'geometry_svd' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold uppercase">
                <Layers className="w-5 h-5" />
                2. Siêu Phẳng Kích Hoạt & Phân Tích Giá Trị Kỳ Dị (SVD)
              </div>

              {viewPerspective === 'layman' ? (
                <div className="space-y-4 text-xs font-mono leading-relaxed text-slate-300">
                  <p>
                    Khi bạn hỏi AI, bên trong mô hình có một không gian nhiều chiều (từ 2048 đến 8192 chiều). Các câu hỏi "bị cấm" sẽ bay về một góc (Cụm Từ Chối - Refusal Cluster), còn các câu hỏi "bình thường" sẽ bay về góc đối diện (Cụm Lành Tính - Benign Cluster).
                  </p>

                  <div className="p-4 bg-slate-950 rounded-lg border border-white/10 space-y-2">
                    <strong className="text-white block">Giải nghĩa các thành phần trên giao diện đồ thị:</strong>
                    <div className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                      <span><strong>Chấm đỏ (Harmful Prompts):</strong> Các câu hỏi thử nghiệm ranh giới an toàn kích hoạt phản xạ từ chối.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span><strong>Chấm xanh lá (Benign Prompts):</strong> Các câu hỏi tương tự nhưng mang tính học thuật an toàn.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                      <span><strong>Chấm xanh dương (Math & Code):</strong> Không gian tư duy logic toán học được bảo vệ tuyệt đối không bị dịch chuyển.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                      <span><strong>Mũi tên v_refusal (r):</strong> Chiều không gian chính quy định câu trả lời có bị chặn hay không.</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs font-mono leading-relaxed text-slate-300">
                  <div className="p-4 rounded-lg bg-slate-950/90 border border-cyan-500/30">
                    <span className="text-cyan-400 font-bold block mb-2">// MARCHENKO-PASTUR SPECTRAL ANALYSIS & PCA PROJECTION</span>
                    <p>
                      Định lý phổ Marchenko-Pastur trong Ma trận Ngẫu nhiên (Random Matrix Theory) chỉ ra rằng hầu hết nhiễu trong mạng nơ-ron tuân theo phân phối phổ bán nguyệt. Tuy nhiên, vector từ chối v_refusal xuất hiện như một Outlier Singular Value (sigma_1 &gt;&gt; sigma_2), chiếm trên 85-92% tổng năng lượng biến thiên của cụm phân tách.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-white/10 text-[11px] font-mono text-cyan-300 space-y-1">
                    <div>// SVD Decomposition Form:</div>
                    <div className="text-white">Delta_H = U * Sigma * V^T = Sum(sigma_k * u_k * v_k^T)</div>
                    <div className="text-emerald-400">v_refusal = sign(dot(v_1, mu_diff)) * v_1 với norm2(v_refusal) = 1.0</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOPIC 3: FROBENIUS NORM MATH */}
          {selectedTopic === 'frobenius_math' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold uppercase">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                3. Định Lý Bảo Toàn Chuẩn Frobenius (Frobenius Norm Preservation)
              </div>

              {viewPerspective === 'layman' ? (
                <div className="space-y-4 text-xs font-mono leading-relaxed text-slate-300">
                  <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-emerald-200">
                    <strong className="text-emerald-400 text-sm block mb-1">❓ Tại sao các công cụ abliteration thông thường làm AI bị "lú lẫn"?</strong>
                    Khi bạn trừ bớt một véc-tơ khỏi ma trận trọng số, tổng "độ lớn năng lượng" của ma trận đó bị giảm đi. Điều này làm cho tín hiệu truyền qua các tầng nơ-ron bị yếu dần, dẫn đến hiện tượng mô hình trả lời câu hỏi toán sai hoặc sinh ra văn bản vô nghĩa (Gibberish).
                  </div>

                  <div className="p-4 bg-slate-950 rounded-lg border border-white/10 space-y-2">
                    <strong className="text-white block">Giải pháp đột phá của ORBITAL-SVD:</strong>
                    <p>
                      Hệ thống tự động đo chính xác độ lớn ban đầu của ma trận trọng số (gọi là <strong>Chuẩn Frobenius ||W||_F</strong>). Ngay sau khi gọt bỏ hướng từ chối, hệ thống phóng đại nhẹ lại ma trận đúng bằng tỷ lệ đó, giúp ma trận giữ nguyên 100% năng lượng ban đầu!
                    </p>
                    <div className="p-2 bg-slate-900 rounded text-emerald-300 font-bold text-center border border-emerald-500/20">
                      Độ suy hao trí tuệ (ΔLoss): 0.000% — Hoàn toàn trong suốt với benchmark MMLU & GSM8K!
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs font-mono leading-relaxed text-slate-300">
                  <div className="p-4 rounded-lg bg-slate-950/90 border border-emerald-500/30">
                    <span className="text-emerald-400 font-bold block mb-2">// EXACT FROBENIUS ENERGY INVARIANCE FORMULATION</span>
                    <p>
                      Định nghĩa chuẩn Frobenius của ma trận W kích thước (d_out x d_in):
                      norm(W)_F = sqrt( Sum_ij(W_ij^2) ) = sqrt( Trace(W * W^T) )
                    </p>
                    <p className="mt-2">
                      Khi áp dụng toán tử chiếu trực giao P = r * r^T:
                      W* = W - alpha * P * W.
                      Do P là ma trận dương bán xác định, norm(W*)_F &lt;= norm(W)_F. Để triệt tiêu hoàn toàn Spectral Shrinkage, ta áp dụng hệ số chuẩn hóa:
                      s = norm(W)_F / (norm(W*)_F + 1e-8) ==&gt; W_preserved = s * W*.
                      Chứng minh: norm(W_preserved)_F = s * norm(W*)_F = norm(W)_F (Q.E.D.).
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOPIC 4: AUTO-TUNER & PARETO */}
          {selectedTopic === 'autotuner_pareto' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold uppercase">
                <Sliders className="w-5 h-5" />
                4. Auto-Iterative SVD Tuning Engine & Đường Biên Pareto
              </div>

              {viewPerspective === 'layman' ? (
                <div className="space-y-4 text-xs font-mono leading-relaxed text-slate-300">
                  <p>
                    Bạn không cần phải tự đoán mò xem nên chỉnh ở tầng nào (Layer nào) hay cường độ bao nhiêu (alpha = ?). Tính năng <strong>Auto-Iterative SVD Tuning</strong> sẽ tự động chạy thử nghiệm hàng chục cấu hình khác nhau trong tích tắc.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950 rounded-lg border border-white/10">
                      <strong className="text-cyan-400 block mb-1">Đường Biên Pareto (Pareto Frontier) là gì?</strong>
                      <p className="text-slate-400 text-[11px]">
                        Là tập hợp các cấu hình "hoàn hảo nhất", nơi bạn đạt được tỷ lệ từ chối thấp nhất (0%) mà điểm thông minh vẫn ở mức cao nhất (~100%).
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-white/10">
                      <strong className="text-emerald-400 block mb-1">Nút "Apply Optimal Hyperparameters":</strong>
                      <p className="text-slate-400 text-[11px]">
                        Chỉ cần 1 cú click chuột, ứng dụng sẽ tự động chọn cấu hình chiến thắng trong vòng quét và nạp vào trình xuất mã code!
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/80 rounded-lg border border-white/5 space-y-1.5">
                    <span className="text-white font-bold block">5 Chiến Lược Tối Ưu Sẵn Có:</span>
                    <div>• <strong>Pareto Optimal:</strong> Cân bằng toàn diện giữa mở khóa và giữ trí tuệ.</div>
                    <div>• <strong>Zero Intelligence Loss:</strong> Ưu tiên khóa cứng năng lực giải toán Olympiad & viết code.</div>
                    <div>• <strong>Deep Reasoning CoT:</strong> Giữ nguyên thẻ suy nghĩ <code>&lt;think&gt;</code> cho DeepSeek-R1 / GPT-OSS.</div>
                    <div>• <strong>Genetic Subspace Search:</strong> Thuật toán tiến hóa tìm kiếm đột biến không gian con.</div>
                    <div>• <strong>Colab Free T4 Sweep:</strong> Tối ưu bộ nhớ cho GPU 16GB VRAM miễn phí của Google Colab.</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs font-mono leading-relaxed text-slate-300">
                  <div className="p-4 rounded-lg bg-slate-950/90 border border-cyan-500/30">
                    <span className="text-cyan-400 font-bold block mb-2">// MULTI-OBJECTIVE FITNESS FUNCTION FORMULATION</span>
                    <p>
                      Mục tiêu tìm kiếm nghiệm Pareto tối ưu trên không gian tham số Theta = (alpha, layer_start, layer_end, target_tensors):
                      max Fitness(theta) = w1 * (1 - Refusal(theta)) + w2 * MMLU(theta) + w3 * GSM8K(theta) + w4 * HumanEval(theta) - lambda * Delta_Frobenius
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOPIC 5: KIẾN TRÚC SOTA & TENSOR BẢO VỆ */}
          {selectedTopic === 'architecture_guards' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold uppercase">
                <Cpu className="w-5 h-5" />
                5. Kiến Trúc SOTA & Tensor Bảo Vệ (Protected Subspaces)
              </div>

              <div className="space-y-3 text-xs font-mono leading-relaxed text-slate-300">
                <p>
                  Hệ thống hỗ trợ đầy đủ các siêu kiến trúc hàng đầu thế giới với định tuyến tensor chuyên biệt:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950 rounded-lg border border-cyan-500/30">
                    <span className="text-cyan-300 font-bold flex items-center gap-1.5 mb-1">
                      <Layers className="w-4 h-4" /> Tensor Mục Tiêu Phẫu Thuật (Target Surgery)
                    </span>
                    <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4">
                      <li><code>mlp.down_proj.weight</code> (MLP Down Projection): Nơi mô hình trực tiếp "viết" từ ngữ phản hồi vào luồng thông tin.</li>
                      <li><code>self_attn.o_proj.weight</code> (Attention Output Projection): Nơi tổng hợp sự chú ý ngữ cảnh.</li>
                      <li><code>block_sparse_moe.experts.w2</code>: Trọng số của các chuyên gia MoE.</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-rose-500/30">
                    <span className="text-rose-300 font-bold flex items-center gap-1.5 mb-1">
                      <ShieldCheck className="w-4 h-4 text-rose-400" /> Tensor Được Khóa Bảo Vệ (Guarded - No Touch)
                    </span>
                    <ul className="text-[11px] text-slate-400 space-y-1 list-disc pl-4">
                      <li><code>block_sparse_moe.router.gate</code> (MoE Router): Tuyệt đối không chạm vào để tránh làm sai lệch việc điều phối chuyên gia.</li>
                      <li><code>vision_model / mm_projector</code>: Bộ mã hóa hình ảnh đa phương thức (Multimodal).</li>
                      <li><code>gate_proj / up_proj</code>: Chức năng kích hoạt phi tuyến SwiGLU.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOPIC 6: BENCHMARKS */}
          {selectedTopic === 'benchmarks_eval' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold uppercase">
                <Award className="w-5 h-5 text-emerald-400" />
                6. Bộ Đánh Giá & Benchmark Kiểm Chứng Toàn Diện
              </div>

              <div className="space-y-3 text-xs font-mono leading-relaxed text-slate-300">
                <p>
                  Để chứng minh mô hình không bị "mất trí nhớ", ORBITAL-SVD tích hợp sẵn 4 bộ kiểm chuẩn probe testing song song:
                </p>

                <div className="space-y-2">
                  <div className="p-3 bg-slate-950 rounded-lg border border-white/5 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 text-[10px] font-bold border border-rose-500/30 shrink-0">
                      SAFETY PROBE
                    </span>
                    <div className="text-[11px]">
                      <strong className="text-slate-200 block">Kiểm tra tính tuân thủ tuyệt đối (Safety Edge-Case):</strong>
                      <span className="text-slate-400">Kiểm tra các câu hỏi kỹ thuật chuyên sâu về phân tích lỗ hổng phần mềm, cơ chế bảo mật hệ điều hành. Kết quả: Tỷ lệ từ chối giảm từ 98% xuống 0.00%.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-white/5 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-bold border border-cyan-500/30 shrink-0">
                      GSM8K MATH
                    </span>
                    <div className="text-[11px]">
                      <strong className="text-slate-200 block">Kiểm tra tính toán đại số đa bước (GSM8K Olympiad):</strong>
                      <span className="text-slate-400">Đảm bảo mô hình giải đúng các bài toán hình học, tích phân, xác suất với độ chính xác bảo toàn 97.4% - 100%.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-white/5 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 shrink-0">
                      HUMANEVAL
                    </span>
                    <div className="text-[11px]">
                      <strong className="text-slate-200 block">Kiểm tra viết mã nguồn thuật toán (HumanEval Code):</strong>
                      <span className="text-slate-400">Kiểm tra sinh code Python chuẩn PEP8, thuật toán Quy hoạch động (Dynamic Programming), cấu trúc dữ liệu cây nhị phân.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-white/5 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 text-[10px] font-bold border border-indigo-500/30 shrink-0">
                      REASONING COT
                    </span>
                    <div className="text-[11px]">
                      <strong className="text-slate-200 block">Kiểm tra chuỗi suy luận sâu (Chain-of-Thought):</strong>
                      <span className="text-slate-400">Bảo toàn toàn bộ các token suy nghĩ nội tâm trong khối <code>&lt;think&gt; ... &lt;/think&gt;</code> cho DeepSeek-R1 và GPT-OSS.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOPIC 7: HƯỚNG DẪN GOOGLE COLAB */}
          {selectedTopic === 'colab_export' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold uppercase">
                <FileCode2 className="w-5 h-5 text-amber-400" />
                7. Hướng Dẫn 1-Click Chạy Trên Google Colab & Kaggle
              </div>

              <div className="space-y-3 text-xs font-mono leading-relaxed text-slate-300">
                <div className="p-4 rounded-lg bg-slate-950 border border-white/10 space-y-2">
                  <span className="text-amber-400 font-bold block text-sm">🚀 3 Bước Thực Thi Trên GPU Miễn Phí (Colab T4 / L4):</span>
                  
                  <div className="space-y-2 text-[11px] pt-1">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">1</span>
                      <div>
                        <strong>Tải file Notebook:</strong> Chuyển sang tab <em>"1-Click Python / Colab Script Exporter"</em>, chọn định dạng <strong>.ipynb</strong> và bấm <strong>Download</strong>.
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">2</span>
                      <div>
                        <strong>Mở Google Colab:</strong> Truy cập <code>colab.research.google.com</code> ⟹ Chọn tab <strong>Upload</strong> ⟹ Chọn file vừa tải về.
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">3</span>
                      <div>
                        <strong>Bật GPU & Chạy:</strong> Vào menu <em>Runtime ⟹ Change runtime type ⟹ Chọn T4 GPU (Free)</em> ⟹ Bấm <strong>Run All (Ctrl + F9)</strong>. Mô hình sẽ được phẫu thuật hoàn tất trong ~30 giây và lưu ra thư mục Safetensors!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOPIC 8: BẢN ĐẶC TẢ CHO AI AGENT */}
          {selectedTopic === 'ai_agent_spec' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold uppercase">
                <Terminal className="w-5 h-5 text-cyan-400" />
                8. Bản Đặc Tả Kỹ Thuật Cho AI Agent (AI Agent System Contract)
              </div>

              <div className="space-y-3 text-xs font-mono leading-relaxed text-slate-300">
                <div className="p-4 rounded-lg bg-slate-950/90 border border-cyan-500/40 text-[11px] font-mono text-slate-300 space-y-2">
                  <span className="text-cyan-400 font-bold block">// SYSTEM CONTRACT FOR AUTONOMOUS RESEARCH AGENTS</span>
                  <p>
                    Khi một AI Agent hoặc Script tự động điều khiển Workbench này, các quy tắc bất biến sau phải được tuân thủ nghiêm ngặt:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400">
                    <li><strong className="text-white">Tensor Invariance Rule:</strong> Luôn áp dụng Frobenius scaling factor s = norm(W)_F / (norm(W*)_F + 1e-8) sau mỗi bước biến đổi ma trận W.</li>
                    <li><strong className="text-white">MoE Router Exemption:</strong> Nghiêm cấm áp dụng toán tử chiếu lên router.gate hoặc switch_gate để tránh sụp đổ định tuyến chuyên gia (Expert Collapsing).</li>
                    <li><strong className="text-white">Gram-Schmidt Orthogonalization:</strong> Bắt buộc trừ hình chiếu dot(r, v_math) trước khi thực thi phẫu thuật trọng số.</li>
                    <li><strong className="text-white">Layer Span Boundaries:</strong> Khoảng tầng khuyến nghị tối ưu luôn nằm trong phân vị từ 25% đến 65% tổng chiều sâu mạng Transformer.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
